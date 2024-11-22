import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Connection, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Stock } from "src/stock/entities/stock.entity";
import { UpdateStockDto } from '../stock/dto/update-stock.dto';
import { StockMovementType, UpdateStockMovementDto } from "src/stock/dto/update-stock-movements.dto";
import { StockMovement } from "src/stock_movements/entities/stock_movements.entity";
import { CreateStockDto } from "src/stock/dto/create-stock.dto";
import { CreateProductWithStockDto } from "src/stock/dto/createProducWithStock.dto";
import { UpdateProductDto } from "./dto/update-product";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Stock)
        private readonly stockRepository: Repository<Stock>,

        @InjectRepository(StockMovement)
        private readonly stockMovementRepository: Repository<StockMovement>,

        private readonly connection: Connection,  // Inyectar la conexión

    ) {}
    
    async createProductWithStock(createProductDto: CreateProductDto, createStockDto: CreateStockDto) {
        const stock = this.stockRepository.create(createStockDto);
        const savedStock = await this.stockRepository.save(stock);

        const product = this.productRepository.create({
            ...createProductDto,
            stock: savedStock,
        });

        return this.productRepository.save(product);
    }
    
    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ["stock"],
        });

        if (!product) {
            throw new NotFoundException('No existe el producto.');
        }

        Object.assign(product, updateProductDto);

        if (updateProductDto.stock) {
            const stock = product.stock || this.stockRepository.create();
            Object.assign(stock, updateProductDto.stock);

            product.stock = await this.stockRepository.save(stock);
        }

        return await this.productRepository.save(product);
    }

    async updateStock(id: number, updateStockDto: UpdateStockDto) {
        const product = await this.productRepository.findOne({
          where: { id },
          relations: ["stock"],
        });
    
        if (!product) {
          throw new NotFoundException("No existe el producto.");
        }
    
        const stock = product.stock;
        if (!stock) {
            throw new NotFoundException("No existe stock para este producto.");
        }
    
        Object.assign(stock, updateStockDto)
    
        await this.stockRepository.save(stock);
        return stock;
      }

      async updateStockMovement(id: number, updateStockMovementDto: UpdateStockMovementDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ["stock"],
        });
    
        if (!product) {
            throw new NotFoundException("No existe el producto.");
        }
    
        const stock = product.stock;
        if (!stock) {
            throw new NotFoundException("No existe stock para este producto.");
        }
    
        if (updateStockMovementDto.type === StockMovementType.SALIDA && stock.actual_quantity < updateStockMovementDto.quantity) {
            throw new BadRequestException("No hay suficiente stock para realizar la salida.");
        }
    
        let newStockQuantity = stock.actual_quantity;
    
        const stockMovement = new StockMovement();
        stockMovement.stock = stock;
        stockMovement.quantity = updateStockMovementDto.quantity;
        stockMovement.type = updateStockMovementDto.type;
    
        if (updateStockMovementDto.type === StockMovementType.ENTRADA) {
            newStockQuantity += updateStockMovementDto.quantity;
        } else if (updateStockMovementDto.type === StockMovementType.SALIDA) {
            newStockQuantity -= updateStockMovementDto.quantity;
        }
    
        stock.actual_quantity = newStockQuantity;
    
        await this.stockMovementRepository.save(stockMovement);
        await this.stockRepository.save(stock);
    
        return stock;
    }    
    
    async delete(id: number){
        const product = await this.productRepository.findOneBy({ id });

        if(!product){
            throw new NotFoundException('No existe el producto.');
        }

        product.state = 'Inactivo';
        await this.productRepository.save(product);
    }

    findOneById(id: number){
        return this.productRepository.findOneBy({id})
    }

    findOneByName( name: string ){
        return this.productRepository.findOneBy({name});
    }

    findOneBySector( sector: string ){
        return this.productRepository.findOneBy({sector});
    }

    findAll(){
        return this.productRepository.find()
    }

    async getProductsWithStock(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['stock'] });
    }

    async getProductDetails() {
        return await this.productRepository.find({
            relations: ["stock", "requestsSupplier.supplier", "requestsClient.client"],
        });
    }

    async getProductById(productId: number): Promise<Product> {
        return this.productRepository.findOne({
            where: { id: productId },
            relations: ['stock'], // Esto asegura que el stock se incluya
        });
    }    
}