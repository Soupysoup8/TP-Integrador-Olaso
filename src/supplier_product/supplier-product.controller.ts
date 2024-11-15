import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { SupplierProductService } from "./supplier-product.service";

@Controller('requestSupplier')
export class SupplierProductController{
    constructor( private readonly supplierProductService: SupplierProductService ){}

    @Post()
    create(@Body() {supplierId, productId, requestedQuantity} : {supplierId: number, productId: number, requestedQuantity: number} ){
        return this.supplierProductService.create(supplierId, productId, requestedQuantity);
    }

    @Get(':supplierId')
    findRequestByClient(@Param('supplierId') supplierId: number){
        return this.supplierProductService.findRequestByClient(supplierId);
    }

    @Patch(':supplierId/:productId')
    update(
        @Param('supplierId') supplierId: number,
        @Param('productId') productId: number,
        @Body() { requestedQuantity }: { requestedQuantity: number }
    ) {
        return this.supplierProductService.update(supplierId, productId, requestedQuantity);
    }

}