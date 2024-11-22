import { Module } from '@nestjs/common';
import { StockMovementsService } from './stock_movements.service';
import { StockController } from './stock_movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from 'src/stock/entities/stock.entity';
import { StockMovement } from './entities/stock_movements.entity';
import { Client } from 'src/client/entities/client.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Stock, StockMovement, Client, Supplier, Product]), 
      ],
    controllers: [StockController], 
    providers: [StockMovementsService],   
    exports: [StockMovementsService],
})
export class StockModule {}