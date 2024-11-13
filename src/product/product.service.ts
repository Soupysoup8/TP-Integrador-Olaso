import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}
    
    async create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }    

    async update(id: number, updateProductDto: UpdateProductDto){
        const product = await this.productRepository.findOneBy({id});

        if(!product){
            throw new NotFoundException('No existe el producto.');
        }

        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product)
    }

    async delete(id: number){
        const product = await this.productRepository.findOneBy({ id });

        if(!product){
            throw new NotFoundException('No existe el producto.');
        }

        product.state = 'Inactivo';
        await this.productRepository.save(product);
    }

    findOneById(id: number){
        return this.productRepository.findOneBy({id})
    }

    findOneByName( name: string ){
        return this.productRepository.findOneBy({name});
    }

    findOneBySector( sector: string ){
        return this.productRepository.findOneBy({sector});
    }

    findAll(){
        return this.productRepository.find()
    }
}
