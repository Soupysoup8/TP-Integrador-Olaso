import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Stock } from "src/stock/entities/stock.entity";
import { Repository } from "typeorm";
import { StockMovement, StockMovementType } from "./entities/stock_movements.entity";

@Injectable()
export class StockMovementsService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,

    @InjectRepository(StockMovement)
    private readonly stockMovementRepository: Repository<StockMovement>,
  ) {}

  async createMovement(stockId: number, quantity: number, type: StockMovementType) {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
    });

    if (!stock) {
      throw new NotFoundException('Stock no encontrado');
    }

    const movement = new StockMovement();
    movement.stock = stock;
    movement.quantity = quantity;
    movement.type = type;

    // Aquí puedes realizar la lógica para actualizar la cantidad en el stock
    if (type === StockMovementType.ENTRADA) {
      stock.actual_quantity += quantity;
    } else if (type === StockMovementType.SALIDA) {
      stock.actual_quantity -= quantity;
    }

    // Guarda el movimiento y el stock actualizado
    await this.stockMovementRepository.save(movement);
    await this.stockRepository.save(stock);

    return movement;
  }
}
