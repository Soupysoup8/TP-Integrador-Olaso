import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}