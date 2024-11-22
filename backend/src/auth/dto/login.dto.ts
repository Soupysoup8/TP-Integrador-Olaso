import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    email:string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @Transform(({value}) => value.trim())
    @IsString()
    dni: string;
}