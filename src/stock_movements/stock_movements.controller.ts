import { Body, Controller, Param, Post } from "@nestjs/common";
import { StockMovementsService } from "./stock_movements.service";
import { StockMovementType } from "./entities/stock_movements.entity";

@Controller('stock')
export class StockController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post(':id/movement')
  async createMovement(
    @Param('id') stockId: number,
    @Body() { quantity, type }: { quantity: number, type: StockMovementType }
  ) {
    return this.stockMovementsService.createMovement(stockId, quantity, type);
  }
}
