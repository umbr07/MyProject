"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async createUser(userDto) {
        const user = await this.usersModel.findOne({
            $or: [{ email: userDto.email }, { nick: userDto.nick }],
        });
        if (user) {
            if (user.email === userDto.email) {
                throw new common_1.HttpException(`Пользователь с таким email как ${userDto.email} уже существует`, common_1.HttpStatus.FOUND);
            }
            if (user.nick === userDto.nick) {
                throw new common_1.HttpException(`Пользователь с таким nickname как ${userDto.nick} уже существует.`, common_1.HttpStatus.FOUND);
            }
        }
        const salt = bcrypt.genSaltSync(3);
        const hashPassword = bcrypt.hashSync(userDto.password, salt);
        const newUser = new this.usersModel(Object.assign(Object.assign({}, userDto), { password: hashPassword }));
        return newUser.save();
    }
    async loginUser(email, password) {
        const user = await this.usersModel.findOne({ email: email });
        if (!user) {
            throw new common_1.HttpException("Введите правильный логин или пароль", common_1.HttpStatus.NOT_FOUND);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new common_1.HttpException("Введите правильный логин или пароль", common_1.HttpStatus.BAD_REQUEST);
        }
        return { user: user };
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("users")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map