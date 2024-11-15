import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateStockDto } from "src/stock/dto/update-stock.dto";


export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    sector?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    state?: string;

    @ValidateNested()
    @Type(() => UpdateStockDto)
    stock: UpdateStockDto;
}