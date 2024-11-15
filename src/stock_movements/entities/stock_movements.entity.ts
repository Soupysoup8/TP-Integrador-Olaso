import { Stock } from 'src/stock/entities/stock.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

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
}
