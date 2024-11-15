import { IsEmail, IsPhoneNumber } from "class-validator";
import { SupplierProduct } from "src/supplier_product/entity/supplier-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supplier{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sector: string;

    @Column()
    address: string;

    @Column()
    contact: string;

    @Column()
    email: string;

    @Column({default: 'Activo'})
    state: string;

    @OneToMany(() => SupplierProduct, (supplierProduct) => supplierProduct.supplier)
    requests: SupplierProduct[];
}