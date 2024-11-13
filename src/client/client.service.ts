import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client';
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ){}

    async create(createClientDto: CreateClientDto) {
        const supplier = this.clientRepository.create(createClientDto);
        return await this.clientRepository.save(supplier);
    }    

    async update(id: number, updateClientDto: UpdateClientDto){
        const client = await this.clientRepository.findOneBy({id});

        if(!client){
            throw new NotFoundException('No existe el cliente.');
        }

        Object.assign(client, updateClientDto);
        return await this.clientRepository.save(client)
    }

    async delete(id: number){
        const client = await this.clientRepository.findOneBy({ id });

        if(!client){
            throw new NotFoundException('No existe el cliente.');
        }

        client.state = 'Inactivo';
        await this.clientRepository.save(client);
    }

    findOneById(id: number){
        return this.clientRepository.findOneBy({id})
    }

    findOneByName( name: string ){
        return this.clientRepository.findOneBy({name});
    }

    findOneBySector( sector: string ){
        return this.clientRepository.findOneBy({sector});
    }

    findAll(){
        return this.clientRepository.find()
    }
}