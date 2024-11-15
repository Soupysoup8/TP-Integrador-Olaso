import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateStockDto{

    @IsPositive()
    @IsNumber()
    @IsPositive()
    base_quantity: number;

    @IsPositive()
    @IsNumber()
    @IsPositive()
    min_quantity: number;

    @IsPositive()
    @IsNumber()
    @IsPositive()
    max_quantity: number;
    
}