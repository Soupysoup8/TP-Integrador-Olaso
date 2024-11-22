import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client';
import { Client } from "./entities/client.entity";
import { ClientProduct } from 'src/client_product/entities/client_product.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(ClientProduct)
    private readonly clientProductRepository: Repository<ClientProduct>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    // Crear el cliente a partir del DTO
    const client = this.clientRepository.create(createClientDto);
    await this.clientRepository.save(client); // Guardar el cliente
  
    // Si se proporcionan productos seleccionados
    if (createClientDto.selectedProductIds) {
      for (const productId of createClientDto.selectedProductIds) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (product) {
          // Crear la asociación entre el cliente y el producto
          const clientProduct = this.clientProductRepository.create({
            client,
            product,
            requestedQuantity: 1, // Aquí puedes poner la cantidad que desees
          });
          await this.clientProductRepository.save(clientProduct); // Guardar la relación
        } else {
          // Si el producto no se encuentra, lanzar un error o manejarlo según tu lógica
          throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
        }
      }
    }
  
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException('No existe el cliente.');
    }

    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async delete(id: number) {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException('No existe el cliente.');
    }

    client.state = 'Inactivo';
    await this.clientRepository.save(client);
  }

  findOneById(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.clientRepository.findOneBy({ name });
  }

  findOneBySector(sector: string) {
    return this.clientRepository.findOneBy({ sector });
  }

  findAll() {
    return this.clientRepository.find();
  }
}
