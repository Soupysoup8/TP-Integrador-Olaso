import { IsArray, IsEnum, IsNumber, IsOptional, IsPositive, IsString, ValidateIf } from 'class-validator';
import { StockMovementType } from 'src/stock_movements/entities/stock_movements.entity';

export class CreateMovementDto {
  @IsString()
  name: string;

  @IsString()
  sector: string;

  @IsNumber()
  productId: number;

  @IsEnum(StockMovementType)
  movementType: StockMovementType;

  @IsPositive()
  @IsNumber()
  quantity: number;

  // Validación condicional para asegurar que si el movimiento es salida, debe haber un cliente seleccionado
  @ValidateIf(o => o.movementType === StockMovementType.SALIDA)
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  selectedClientIds: number[];

  // Validación condicional para asegurar que si el movimiento es entrada, debe haber un proveedor seleccionado
  @ValidateIf(o => o.movementType === StockMovementType.ENTRADA)
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  selectedSupplierIds: number[];
}
