import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { ClientProduct } from 'src/client_product/entities/client_product.entity'; // Asegúrate de importar la entidad
import { ClientProductModule } from 'src/client_product/client_product.module'; // Si ClientProduct está en su propio módulo

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, ClientProduct]),
    ClientProductModule,
  ],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
