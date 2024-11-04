import { Transform } from "class-transformer";
import { IsString, IsEmail, MinLength,  } from "class-validator";

export class LoginDto{
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    password: string;
}