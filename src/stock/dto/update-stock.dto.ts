import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateStockDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    base_quantity?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    min_quantity?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    max_quantity?: number;

    @IsOptional()
    @IsNumber()
    product_id?: number;  // Esto debería ser opcional si lo estás permitiendo en el PATCH
}
