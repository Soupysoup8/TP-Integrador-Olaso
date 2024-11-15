import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateStockDto } from "src/stock/dto/create-stock.dto";

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

    @ValidateNested()
    @Type(() => CreateStockDto)
    stock: CreateStockDto;
}
