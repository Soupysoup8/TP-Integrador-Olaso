import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientProductService } from './client_product.service';

@Controller('requestClient')
export class ClientProductController{
    constructor( private readonly clientProductService: ClientProductService ){}

    @Post()
    create(@Body() {clientId, productId, requestedQuantity} : {clientId: number, productId: number, requestedQuantity: number} ){
        return this.clientProductService.create(clientId, productId, requestedQuantity);
    }

    @Get(':clientId')
    findRequestByClient(@Param('clientId') clientId: number){
        return this.clientProductService.findRequestByClient(clientId);
    }

    @Patch(':clientId/:productId')
    update(
        @Param('clientId') clientId: number,
        @Param('productId') productId: number,
        @Body() { requestedQuantity }: { requestedQuantity: number }
    ) {
        return this.clientProductService.update(clientId, productId, requestedQuantity);
    }

}