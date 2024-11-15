import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierProduct } from './entity/supplier-product.entity';
import { Repository } from "typeorm";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Product } from "src/product/entities/product.entity";

@Injectable()
export class SupplierProductService{
    constructor(

        @InjectRepository(SupplierProduct)
        private readonly supplierProductRepository: Repository<SupplierProduct>,

        @InjectRepository(Supplier)
        private readonly SupplierRepository: Repository<Supplier>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}

    async create(supplierId: number, productId: number, requestedQuantity: number){
        const supplier = await this.SupplierRepository.findOneBy({id: supplierId});
        const product = await this.productRepository.findOneBy({id: productId});

        if (!supplier){
            return 'El proveedor seleccionado no existe.';
        }

        if (!product){
            return 'El producto seleccionado no existe.';
        }

        const requests = this.supplierProductRepository.create({supplier, product, requestedQuantity});
        return this.supplierProductRepository.save(requests);
    }

    async update(supplierId: number, productId: number, requestedQuantity: number){
        const supplierProduct = await this.supplierProductRepository.findOne({
            where: { 
                supplier: { id: supplierId },
                product: { id: productId }
            },
            relations: ['supplier', 'product']
        });

        if (!supplierProduct){
            throw new NotFoundException('No existe el proveedor o su producto.');
        }

        supplierProduct.requestedQuantity = requestedQuantity;

        return this.supplierProductRepository.save(supplierProduct);
    }

    async findRequestByClient( supplierId: number ){
        const supplier = await this.SupplierRepository.find({
            where: { id: supplierId },
            relations: ['requests', 'requests.product'],
        })

        if (supplier.length === 0) {
            throw new NotFoundException("No existen solicitudes para este cliente.");
        }

        return supplier;

    }

}