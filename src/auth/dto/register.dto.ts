import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNumber, IsPositive, IsString, Length, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(3)
    surname: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @Transform(({ value }) => value.trim())
    @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos.' })
    dni: number;

}