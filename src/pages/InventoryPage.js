import React from "react";
import Menubar from "../components/menu/Menubar";
import ProductTable from "../components/table/ProductTable";


function InventoryPage() {
    return(
        <div id="inventoryPage">
            <Menubar />
            <ProductTable />
        </div>
    )
}

export default InventoryPage;