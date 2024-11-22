import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";

@Entity()
export class SupplierProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Supplier, supplier => supplier.requests)
    supplier: Supplier;

    @ManyToOne(() => Product, product => product.requestsSupplier)
    product: Product;

    @Column()
    requestedQuantity: number;
}