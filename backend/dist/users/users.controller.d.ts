import { UsersDto } from "./users.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(userDto: UsersDto): Promise<import("./schemas/user.schema").Users>;
    login({ email, password }: UsersDto): Promise<{
        user: UsersDto;
    }>;
}
