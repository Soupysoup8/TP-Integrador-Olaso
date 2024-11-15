import { ClientProduct } from "src/client_product/entities/client_product.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { SupplierProduct } from "src/supplier_product/entity/supplier-product.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sector: string;

    @Column()
    brand: string;

    @Column({default: 'Activo'})
    state: string;

    @OneToOne(() => Stock)
    @JoinColumn({ name: 'stock_id' })
    stock: Stock;  

    @OneToMany(() => ClientProduct, request => request.product)
    requestsClient: ClientProduct[];

    @OneToMany(() => SupplierProduct, request => request.product)
    requestsSupplier: SupplierProduct[];
}