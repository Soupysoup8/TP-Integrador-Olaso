import { IsDate, IsEnum, IsNumber, IsPositive } from "class-validator";

export enum StockMovementType {
    ENTRADA = 'entrada',
    SALIDA = 'salida',
}

export class UpdateStockMovementDto {
    @IsEnum(StockMovementType)
    type: StockMovementType;

    @IsPositive()
    @IsNumber()
    quantity: number;

}
