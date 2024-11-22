import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierProductModule } from './supplier_product/supplier-product.module';
import { ClientProductModule } from './client_product/client_product.module';
import { StockModule } from './stock_movements/stock_movements.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "db_crud",
      autoLoadEntities: true,
      synchronize: true,
      logging: true,  // Activa los logs

    }),
    UsersModule,
    AuthModule,
    ProductModule,
    ClientModule,
    ClientProductModule,
    SupplierModule,
    SupplierProductModule,
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
