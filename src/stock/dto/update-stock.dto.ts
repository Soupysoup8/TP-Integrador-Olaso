import { IsOptional, IsString, IsNumber, ValidateNested, IsPositive } from "class-validator";

export class UpdateStockDto {
    @IsPositive()
    @IsOptional()
    @IsNumber()
    base_quantity?: number;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    min_quantity?: number;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    max_quantity?: number;
}