import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsString()
    name: string;

    @IsString()
    sector: string;

    @IsString()
    address: string;

    @IsPhoneNumber(null)
    contact: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    state: string;
}
