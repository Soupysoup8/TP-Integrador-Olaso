import React from "react";
import Menubar from "../components/menu/Menubar";
import StockMovementTable from "../components/table/MovementsTable";

function AllMovementsPage() {
    return(
        <div id="allMovementsPage">
            <Menubar />
            <StockMovementTable />
        </div>
    )
}

export default AllMovementsPage;