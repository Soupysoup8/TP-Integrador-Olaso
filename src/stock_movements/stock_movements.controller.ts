import { Body, Controller, Get, Inject, Injectable, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StockMovementsService } from './stock_movements.service';
import { StockMovementType } from "./entities/stock_movements.entity";
import { CreateMovementDto } from "src/stock/dto/createMovement.dto";
import { Stock } from "src/stock/entities/stock.entity";
import { UpdateStockDto } from "src/stock/dto/update-stock.dto";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockMovementsService: StockMovementsService,

    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,


  ) {}

  @Get(':id')
  async getStock(@Param('id') id: number): Promise<Stock> {
    return this.stockMovementsService.getStockWithProduct(id);
  }

  @Post('movement')
  async createCustomMovement(@Body() createMovementDto: CreateMovementDto) {
    return this.stockMovementsService.createCustomMovement(createMovementDto);
  }

  @Get('movement')
  async getAllMovements() {
    return this.stockMovementsService.getAllMovements();
  }

  @Post(':id/movement')
  async createMovement(
    @Param('id') stockId: number,
    @Body() { quantity, type }: { quantity: number, type: StockMovementType }
  ) {
    return this.stockMovementsService.createMovement(stockId, quantity, type);
  }

  @Patch(':id')
async updateStockId(
  @Param('id') stockId: number,
  @Body() updateStockDto: UpdateStockDto,
) {
  // Buscar el stock con el ID
  const stock = await this.stockRepository.findOne({
    where: { id: stockId },
    relations: ['product'],  // Cargar la relación con el producto
  });

  if (!stock) {
    throw new NotFoundException(`Stock con ID ${stockId} no encontrado`);
  }

  // Si se proporciona un product_id en el DTO, actualizar el producto asociado
  if (updateStockDto.product_id) {
    const product = await this.productRepository.findOne({
      where: { id: updateStockDto.product_id },  // Buscar el producto con el product_id
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${updateStockDto.product_id} no encontrado`);
    }

    stock.product = product;  // Asignar el producto al stock
  }

  // Actualizar las demás propiedades del stock
  if (updateStockDto.base_quantity) stock.base_quantity = updateStockDto.base_quantity;
  if (updateStockDto.min_quantity) stock.min_quantity = updateStockDto.min_quantity;
  if (updateStockDto.max_quantity) stock.max_quantity = updateStockDto.max_quantity;

  // Guardar el stock actualizado
  await this.stockRepository.save(stock);

  return stock;
}

  
}