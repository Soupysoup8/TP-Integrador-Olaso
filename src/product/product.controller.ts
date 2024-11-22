import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from './product.service';
import { UpdateStockDto } from "src/stock/dto/update-stock.dto";
import { UpdateStockMovementDto } from "src/stock/dto/update-stock-movements.dto";
import { CreateProductWithStockDto } from "src/stock/dto/createProducWithStock.dto";
import { plainToInstance } from "class-transformer";
import { Product } from "./entities/product.entity";
import { UpdateProductDto } from "./dto/update-product";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

    @Post('product-with-stock')
    async createProductWithStock(@Body() createProductWithStockDto: CreateProductWithStockDto) {
        const { product, stock } = createProductWithStockDto;
        return this.productService.createProductWithStock(product, stock);
    }
    
    @Get()
    async findAll() {
        const products = await this.productService.findAll();
        return plainToInstance(Product, products);
    }

    @Get('id/:id')
    getProductById(@Param('id') id:number){
        return this.productService.findOneById(+id);
    }

    @Get('name/:name')
    findOneByName(@Param('name') name: string){
        return this.productService.findOneByName(name);
    }

    @Get('sector/:sector')
    findOneBySector(@Param('sector') sector: string){
        return this.productService.findOneBySector(sector);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @Patch(':id/update-attributes')
    updateStockAttributes(@Param('id') id: number, @Body() updateStockDto: UpdateStockDto) {
        return this.productService.updateStock(id, updateStockDto);
    }

    @Patch(':id/update-movement')
    updateStockMovement(@Param('id') id: number, @Body() updateStockMovementDto: UpdateStockMovementDto) {
        return this.productService.updateStockMovement(id, updateStockMovementDto);
    }

    @Patch(':id/delete')
    softDelete(@Param('id') id: string){
        return this.productService.delete(+id)
    }

    @Get('product-with-stock')
    async getProductsWithStock(): Promise<Product[]> {
        return this.productService.getProductsWithStock();
    }

    @Get('details')
    async getProductDetails() {
        return this.productService.getProductDetails();
    }
}