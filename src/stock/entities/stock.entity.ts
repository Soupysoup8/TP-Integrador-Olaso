import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    base_cuantity: number;

    @Column()
    type: number;

    @Column()
    actual_cuantity: number;

    @Column()
    max_cuantity: number;

    @Column()
    min_cuantity: number;
}