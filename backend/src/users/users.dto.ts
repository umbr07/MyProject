import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class UsersDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^\S*$/, { message: "Password should not contain spaces" })
  password: string;

  @IsNotEmpty()
  @Matches(/^\S*$/, { message: "Nickname should not contain spaces" })
  nick: string;
}
