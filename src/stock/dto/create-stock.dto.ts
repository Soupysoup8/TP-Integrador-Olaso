import { Exclude, Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Product } from "src/product/entities/product.entity";

export class CreateStockDto{

    @IsNumber()
    @IsPositive()
    base_quantity: number;

    @IsNumber()
    @IsPositive()
    min_quantity: number;

    @IsNumber()
    @IsPositive()
    max_quantity: number;

    @IsOptional()
    @IsNumber()
    actual_quantity?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => Product)  // Asegura que la propiedad sea transformada como un objeto Product
    product?: Product; 
}