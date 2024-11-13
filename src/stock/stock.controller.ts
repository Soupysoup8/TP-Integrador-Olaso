import { Body, Controller, Post } from "@nestjs/common";

@Controller("stock")
export class StockController{
    constructor (private readonly stockService: StockService){}
    
    @Post("registerStock")
    create(@Body() createStockDto: CreateStockDto){
        return this.stockService.create(createStockDto);
    }

    @Get()
    findOneById(){
        return this.stockService.
    }

}