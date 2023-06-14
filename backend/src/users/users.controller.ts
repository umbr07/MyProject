import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UsersDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/registration")
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: UsersDto) {
    return this.usersService.createUser(userDto);
  }

  @Post("/login")
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async login(@Body() { email, password }: UsersDto) {
    return this.usersService.loginUser(email, password);
  }
}
