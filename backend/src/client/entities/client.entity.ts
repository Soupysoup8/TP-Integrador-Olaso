// client.entity.ts
import { ClientProduct } from "src/client_product/entities/client_product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
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

  @Column({ default: 'Activo' })
  state: string;

  @OneToMany(() => ClientProduct, (clientProduct) => clientProduct.client)
  requests: ClientProduct[];
}