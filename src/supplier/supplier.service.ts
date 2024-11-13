import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from './entities/supplier.entity';
import { Repository } from "typeorm";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>
    ){}

    async create(createSupplierDto: CreateSupplierDto) {
        const supplier = this.supplierRepository.create(createSupplierDto);
        return await this.supplierRepository.save(supplier);
    }    

    async update(id: number, updateSupplierDto: UpdateSupplierDto){
        const supplier = await this.supplierRepository.findOneBy({id});

        if(!supplier){
            throw new NotFoundException('No existe el proveedor.');
        }

        Object.assign(supplier, updateSupplierDto);
        return await this.supplierRepository.save(supplier)
    }

    async delete(id: number){
        const supplier = await this.supplierRepository.findOneBy({ id });

        if(!supplier){
            throw new NotFoundException('No existe el proveedor.');
        }

        supplier.state = 'Inactivo';
        await this.supplierRepository.save(supplier);
    }

    findOneById(id: number){
        return this.supplierRepository.findOneBy({id})
    }

    findOneByName( name: string ){
        return this.supplierRepository.findOneBy({name});
    }

    findOneBySector( sector: string ){
        return this.supplierRepository.findOneBy({sector});
    }

    findAll(){
        return this.supplierRepository.find()
    }
}