import { Injectable } from "@nestjs/common";

@Injectable()
export class StockService{
    constructor(
        private readonly StockService: StockService
    ){}

    async registerStockSalida({ base, tipo, cantidad }){
        return null
    } 
}