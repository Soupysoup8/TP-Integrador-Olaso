import { IsEmail, IsPhoneNumber } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

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
    @IsPhoneNumber()
    contact: number;

    @Column()
    @IsEmail()
    email: string;

    @Column({default: 'Activo'})
    state: string;
}