import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    dni: string;

    @Column({ nullable: false})
    password: string;

    @Column({ default: "user" })
    rol:string;

    @DeleteDateColumn()
    deletedAt: Date;

}
