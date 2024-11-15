import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Stock } from 'src/stock/entities/stock.entity';
import { StockMovement } from 'src/stock_movements/entities/stock_movements.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Stock, StockMovement]), 
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
