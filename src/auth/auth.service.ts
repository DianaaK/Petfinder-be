import UserRepo, { IUser } from '../users/users.model';
import { sign } from 'jsonwebtoken';
import logger from '../utils/logger';
import passport from 'passport';

const SECRET = process.env.SECRET_TOKEN || '';

class AuthService {
  serialize(user: IUser) {
    const { _id, email } = user;
    return {
      _id,
      email
    };
  }

  async register(user: IUser, next: any) {
    logger.msg('Registering user with email: ' + user.email);
    const password = user.password || '';
    delete user.password;
    const newUser = new UserRepo(user);
    try {
      UserRepo.register(newUser, password, (err: any, regUser: IUser) => {
        newUser.save();
        next(
          err,
          regUser && {
            email: regUser.email,
            password: password
          }
        );
        if (regUser) {
          return {
            email: regUser.email,
            password: password
          };
        }
      });
    } catch (error) {
      throw { ERROR: error };
    }
  }

  login(req: any, res: any) {
    return new Promise((resolve, reject) => {
      try {
        passport.authenticate('local', { session: true }, (err, user, info) => {
          logger.msg('Log in user with email: ' + user.email);
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject({
              code: 'INCORECT_PASSWROD',
              message: (info && info.message) || 'Password or username is incorrect',
              name: info && info.name
            });
          }
          const token = sign({ id: user.id }, SECRET, { expiresIn: 60 * 24 * 30 });
          resolve({
            user: this.serialize(user),
            token
          });
        })(req, res);
      } catch (e) {
        console.warn('e', e);
      }
    });
  }

  changePass(req: any, res: any) {
    return new Promise((resolve, reject) => {
      try {
        passport.authenticate('local', { session: true }, (err, user, info) => {
          logger.msg('Change user password with email: ' + user.email);
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject({
              code: 'INCORECT_PASSWROD',
              message: (info && info.message) || 'Password or username is incorrect',
              name: info && info.name
            });
          }

          user.changePassword(req.body.password, req.body.newPassword, (err1: any) => {
            if (err1) {
              reject(err1);
            }
            resolve(this.serialize(user));
          });
        })(req, res);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default new AuthService();
