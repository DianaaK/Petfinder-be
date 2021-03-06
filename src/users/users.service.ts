import UserRepo, { IUser } from './users.model';
import logger from '../utils/logger';

class UsersService {
  constructor() {}

  async add(user: IUser) {
    logger.msg('Adding user.');
    const newUser = new UserRepo(user);
    return await newUser.save();
  }

  async getById(id: string) {
    logger.msg('Getting user with id: ' + id);
    return await UserRepo.findById(id);
  }

  async update(id: string, updatedUser: IUser) {
    logger.msg('Updating user with id: ' + id);
    const user = await this.getById(id);
    const mergedUser = Object.assign(user, updatedUser);
    await UserRepo.updateOne({ _id: id }, mergedUser, { upsert: true });
    return mergedUser;
  }
}

export default new UsersService();
