import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post()
    create(@Body() createProductDto: CreateProductDto){
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll(){
        return this.productService.findAll();
    }

    @Get('id/:id')
    findOneById(@Param('id') id:number){
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
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto ) {
        return this.productService.update(+id, updateProductDto);
    }

    @Patch(':id/delete')
    delete(@Param('id') id: string){
        return this.productService.delete(+id)
    }
}