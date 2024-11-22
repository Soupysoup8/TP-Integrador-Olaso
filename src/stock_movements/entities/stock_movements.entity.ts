// stock_movements.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Stock } from "src/stock/entities/stock.entity";
import { Client } from "src/client/entities/client.entity"; // Asegúrate de tener esta entidad
import { Supplier } from "src/supplier/entities/supplier.entity"; // Asegúrate de tener esta entidad

export enum StockMovementType {
  ENTRADA = 'entrada',
  SALIDA = 'salida',
}

@Entity()
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;  

  @Column({ type: 'enum', enum: StockMovementType })
  type: StockMovementType;  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  movement_date: Date;  
  
  @ManyToOne(() => Stock, stock => stock.movements, { eager: true })
  @JoinColumn()
  stock: Stock;

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Supplier, { nullable: true })
  @JoinColumn()
  supplier: Supplier;
}