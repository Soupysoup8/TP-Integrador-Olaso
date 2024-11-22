import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierProduct } from "src/supplier_product/entity/supplier-product.entity";
import { Supplier } from './entities/supplier.entity';
import { Product } from "src/product/entities/product.entity";

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>,

        @InjectRepository(SupplierProduct)
        private readonly supplierProductRepository: Repository<SupplierProduct>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

    ){}

    async create(createSupplierDto: CreateSupplierDto) {
        const supplier = this.supplierRepository.create(createSupplierDto);
        await this.supplierRepository.save(supplier)

        if (createSupplierDto.selectedProductIds){
            for (const productId of createSupplierDto.selectedProductIds){
                const product = await this.productRepository.findOne({ where: { id: productId } });
                if (product){
                    const supplierProduct = this.supplierProductRepository.create({
                        supplier,
                        product,
                        requestedQuantity: 1,
                    });

                    await this.supplierProductRepository.save(supplierProduct);
                } else {
                    throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
                }
            }
        }
    }    

    async update(id: number, updateSupplierDto: UpdateSupplierDto){
        const supplier = await this.supplierRepository.findOneBy({id});

        if(!supplier){
            throw new NotFoundException('No existe el proveedor.');
        }

        Object.assign(supplier, updateSupplierDto);
        return await this.supplierRepository.save(supplier)
    }

    async delete(id: number){
        const supplier = await this.supplierRepository.findOneBy({ id });

        if(!supplier){
            throw new NotFoundException('No existe el proveedor.');
        }

        supplier.state = 'Inactivo';
        await this.supplierRepository.save(supplier);
    }

    findOneById(id: number){
        return this.supplierRepository.findOneBy({id})
    }

    findOneByName( name: string ){
        return this.supplierRepository.findOneBy({name});
    }

    findOneBySector( sector: string ){
        return this.supplierRepository.findOneBy({sector});
    }

    findAll(){
        return this.supplierRepository.find()
    }
}