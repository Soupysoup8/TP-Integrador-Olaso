import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientService } from "src/client/client.service";
import { Client } from "src/client/entities/client.entity";
import { Product } from "src/product/entities/product.entity";
import { ProductService } from "src/product/product.service";
import { ClientProduct } from "./entities/client_product.entity";
import { Repository } from "typeorm";
import { NotFoundError } from "rxjs";

@Injectable()
export class ClientProductService{
    constructor(

        @InjectRepository(ClientProduct)
        private readonly clientProductRepository: Repository<ClientProduct>,

        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ){}

    async create(clientId: number, productId: number, requestedQuantity: number){
        const client = await this.clientRepository.findOneBy({id: clientId});
        const product = await this.productRepository.findOneBy({id: productId});

        if (!client){
            return 'El cliente seleccionado no existe.';
        }

        if (!product){
            return 'El producto seleccionado no existe.';
        }

        const requests = this.clientProductRepository.create({client, product, requestedQuantity});
        return this.clientProductRepository.save(requests);
    }

    async update(clientId: number, productId: number, requestedQuantity: number){
        const clientProduct = await this.clientProductRepository.findOne({
            where: { 
                client: { id: clientId },
                product: { id: productId }
            },
            relations: ['client', 'product']
        });

        if (!clientProduct){
            throw new NotFoundException('No existe el cliente o su producto.');
        }

        clientProduct.requestedQuantity = requestedQuantity;

        return this.clientProductRepository.save(clientProduct);
    }

    async findRequestByClient( clientId: number ){
        const client = await this.clientRepository.find({
            where: { id: clientId },
            relations: ['requests', 'requests.product'],
        })

        if (client.length === 0) {
            throw new NotFoundException("No existen solicitudes para este cliente.");
        }

        return client;

    }

}