import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProductService } from './client_product.service';
import { ClientProduct } from './entities/client_product.entity';
import { Client } from 'src/client/entities/client.entity';
import { Product } from 'src/product/entities/product.entity';
import { ClientProductController } from './client_product.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientProduct, Client, Product]),
    ],
    controllers: [ClientProductController],
    providers: [ClientProductService],
    exports: [ClientProductService],
})
export class ClientProductModule {}