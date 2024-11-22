import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplier } from "./entities/supplier.entity";
import { SupplierService } from "./supplier.service";
import { SupplierController } from "./supplier.controller";
import { SupplierProduct } from "src/supplier_product/entity/supplier-product.entity";
import { SupplierProductModule } from "src/supplier_product/supplier-product.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier, SupplierProduct]),
    SupplierProductModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
