// create-product-with-stock.dto.ts
import { IsObject } from 'class-validator';
import { CreateStockDto } from './create-stock.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class CreateProductWithStockDto {
    @IsObject()
    product: CreateProductDto;

    @IsObject()
    stock: CreateStockDto;
}