import { Client } from "src/client/entities/client.entity";
import { Product } from "src/product/entities/product.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.requests)
    client: Client;

    @ManyToOne(() => Product, product => product.requestsClient)
    product: Product;

    @Column()
    requestedQuantity: number;
}
