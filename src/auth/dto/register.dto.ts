import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @Transform(({value}) => value.trim())
    @IsNumber()
    @Length(8)
    dni: number;
}