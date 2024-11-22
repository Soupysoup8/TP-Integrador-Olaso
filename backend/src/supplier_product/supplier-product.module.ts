import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { SupplierProduct } from './entity/supplier-product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierProductController } from './supplier-product.controller';
import { SupplierProductService } from './supplier-product.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SupplierProduct, Supplier, Product]),
    ],
    controllers: [SupplierProductController],
    providers: [SupplierProductService],
    exports: [TypeOrmModule], // Exporta el TypeOrmModule para que otros módulos puedan acceder al repositorio
})
export class SupplierProductModule {}