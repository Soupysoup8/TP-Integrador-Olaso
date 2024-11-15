import { Product } from "src/product/entities/product.entity";
import { StockMovement } from "src/stock_movements/entities/stock_movements.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    base_quantity: number;

    @Column()
    actual_quantity: number;

    @Column()
    min_quantity: number;

    @Column()
    max_quantity: number;

    @OneToMany(() => StockMovement, stockMovement => stockMovement.stock)
    movements: StockMovement[]; 

    @OneToOne(() => Product, product => product.stock)
    @JoinColumn()
    product: Product;  

}