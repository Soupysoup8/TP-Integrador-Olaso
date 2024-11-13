import { IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    name: string;

    @IsString()
    sector: string;

    @IsString()
    brand: string;

    @IsOptional()
    @IsString()
    state?: string;
}
