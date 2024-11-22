import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Stock } from "src/stock/entities/stock.entity";
import { Repository } from "typeorm";
import { StockMovement, StockMovementType } from "./entities/stock_movements.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { CreateMovementDto } from "src/stock/dto/createMovement.dto";
import { Client } from "src/client/entities/client.entity";
import { CreateStockDto } from "src/stock/dto/create-stock.dto";
import { Product } from "src/product/entities/product.entity";
import { UpdateStockDto } from "src/stock/dto/update-stock.dto";

@Injectable()
export class StockMovementsService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,

    @InjectRepository(StockMovement)
    private readonly stockMovementRepository: Repository<StockMovement>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  // Método para crear un movimiento de stock personalizado
  async createCustomMovement(createMovementDto: CreateMovementDto) {
    const { selectedClientIds, selectedSupplierIds, productId, movementType, quantity } = createMovementDto;

    // Usamos getStockWithProduct para obtener el stock con el producto relacionado
    const stock = await this.getStockWithProduct(productId); // Reemplazamos 'id' por 'productId'

    if (!stock) {
      throw new NotFoundException('Producto no encontrado en el stock');
    }

    if (movementType === StockMovementType.SALIDA && stock.actual_quantity < quantity) {
      throw new BadRequestException('No hay suficiente stock para realizar la salida');
    }
    
    // Crear el movimiento
    const movement = new StockMovement();
    movement.stock = stock;
    movement.quantity = quantity;
    movement.type = movementType;

    if (movementType === StockMovementType.ENTRADA) {
      stock.actual_quantity += quantity;
      if (selectedSupplierIds?.length) {
        movement.supplier = await this.supplierRepository.findOneBy({ id: selectedSupplierIds[0] });
      }
    } else if (movementType === StockMovementType.SALIDA) {
      stock.actual_quantity -= quantity;
      if (selectedClientIds?.length) {
        movement.client = await this.clientRepository.findOneBy({ id: selectedClientIds[0] });
      }
    }

    // Guarda los cambios
    await this.stockRepository.save(stock);
    return this.stockMovementRepository.save(movement);
  }

  async createMovement(stockId: number, quantity: number, type: StockMovementType) {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
    });

    if (!stock) {
      throw new NotFoundException('Stock no encontrado');
    }

    if (type === StockMovementType.SALIDA && stock.actual_quantity < quantity) {
      throw new BadRequestException('No hay suficiente stock para realizar la salida');
    }

    const movement = new StockMovement();
    movement.stock = stock;
    movement.quantity = quantity;
    movement.type = type;

    // Lógica para actualizar la cantidad en el stock
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

  async getAllMovements() {
    const movements = await this.stockMovementRepository.find({
      relations: ['stock', 'client', 'supplier'], // Asegúrate de cargar estas relaciones
    });

    return movements.map((movement) => ({
      id: movement.id,
      stock: movement.stock,
      type: movement.type,
      quantity: movement.quantity,
      client: movement.client ? movement.client.name : null, // Puede ser null si no es un cliente
      supplier: movement.supplier ? movement.supplier.name : null, // Puede ser null si no es un proveedor
      productName: movement.stock.product ? movement.stock.product.name : 'Unknown Product',  // Verifica que el producto exista
      actual_quantity: movement.stock.actual_quantity,
    }));
  }

  async getStockWithProduct(productId: number): Promise<Stock> {
    return this.stockRepository
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.product', 'product') // Une 'product' con 'stock'
      .where('stock.product.id = :productId', { productId }) // Filtra por el ID del producto
      .getOne(); // Devuelve solo un resultado
  }

  /*
  async updateStockId(stockId: number, updateStockDto: UpdateStockDto) {
    const stock = await this.stockRepository.findOne({
      where: { id: stockId },
      relations: ['product'], // Asegúrate de cargar la relación con el producto
    });
  
    if (!stock) {
      throw new NotFoundException(`Stock con ID ${stockId} no encontrado`);
    }
  
    const product = await this.productRepoaitory.findOne({ where: { id: updateStockDto.stock_id } });
  
    if (!product) {
      throw new NotFoundException(`Producto con ID ${updateStockDto.stock_id} no encontrado`);
    }
  
    stock.product = product;
  
    await this.stockRepository.save(stock);
    return stock;
  }*/
  
}
