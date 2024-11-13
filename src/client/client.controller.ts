import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientService } from './client.service';
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client";

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService){}

    @Post()
    create(@Body() createClientDto: CreateClientDto){
        return this.clientService.create(createClientDto);
    }

    @Get()
    findAll(){
        return this.clientService.findAll();
    }

    @Get('id/:id')
    findOneById(@Param('id') id:number){
        return this.clientService.findOneById(+id);
    }

    @Get('name/:name')
    findOneByName(@Param('name') name: string){
        return this.clientService.findOneByName(name);
    }

    @Get('sector/:sector')
    findOneBySector(@Param('sector') sector: string){
        return this.clientService.findOneBySector(sector);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto ) {
        return this.clientService.update(+id, updateClientDto);
    }

    @Patch(':id/delete')
    delete(@Param('id') id: string){
        return this.clientService.delete(+id)
    }
}