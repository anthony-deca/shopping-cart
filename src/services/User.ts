import User from "../models/User";
import {IUser, newUserType} from 'User';

class UserService {
    async getByEmail(email: string): Promise<IUser> {
        const user = await User.findOne({email, deleted:false});
        return user;
    }
    async create(newUserData: newUserType) {
        const user = new User(newUserData);
        return user.save();
    }
    async getAll(): Promise<IUser[]> {
        const users = await User.find({deleted: false });
        return users;
    }
}

export default new UserService();