import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    //@Column({primary: true, generated: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    name: string;

    @Column({unique: true, nullable: false})
    email:string;

    @Column({nullable: false})
    password:string;

    @Column({default: "user"}) //when an account is created the default role will be user
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
