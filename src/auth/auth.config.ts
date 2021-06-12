import passport from 'passport';
import passportLocal from 'passport-local';
import UserRepo from '../users/users.model';
import { PassportLocalModel } from 'mongoose';

const LocalStrategy = passportLocal.Strategy;

export default class AuthConfig {
  constructor(app: any) {
    const user = UserRepo as PassportLocalModel<any>;
    passport.use(new LocalStrategy(user.authenticate()));
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());
  }
}
