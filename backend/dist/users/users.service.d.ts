import { Users, UsersDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UsersDto } from "./users.dto";
export declare class UsersService {
    private readonly usersModel;
    constructor(usersModel: Model<UsersDocument>);
    createUser(userDto: UsersDto): Promise<Users>;
    loginUser(email: string, password: string): Promise<{
        user: UsersDto;
    }>;
}
