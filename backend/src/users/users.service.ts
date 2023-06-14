import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Users, UsersDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { UsersDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("users") private readonly usersModel: Model<UsersDocument>
  ) {}

  async createUser(userDto: UsersDto): Promise<Users> {
    const user = await this.usersModel.findOne({
      $or: [{ email: userDto.email }, { nick: userDto.nick }],
    });
    if (user) {
      if (user.email === userDto.email) {
        throw new HttpException(
          `Пользователь с таким email как ${userDto.email} уже существует`,
          HttpStatus.FOUND
        );
      }
      if (user.nick === userDto.nick) {
        throw new HttpException(
          `Пользователь с таким nickname как ${userDto.nick} уже существует.`,
          HttpStatus.FOUND
        );
      }
    }

    const salt = bcrypt.genSaltSync(3);
    const hashPassword = bcrypt.hashSync(userDto.password, salt);

    const newUser = new this.usersModel({ ...userDto, password: hashPassword });
    return newUser.save();
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: UsersDto }> {
    const user = await this.usersModel.findOne({ email: email });
    if (!user) {
      throw new HttpException(
        "Введите правильный логин или пароль",
        HttpStatus.NOT_FOUND
      );
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new HttpException(
        "Введите правильный логин или пароль",
        HttpStatus.BAD_REQUEST
      );
    }

    return { user: user as UsersDto };
  }
}
