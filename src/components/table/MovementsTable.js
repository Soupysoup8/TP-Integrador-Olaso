import React, { useEffect, useState } from "react";

const StockMovementTable = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tpOlaso/v0/stock/movement");
        const data = await response.json();

        if (Array.isArray(data)) {
          setMovements(data);
        } else {
          console.error("La respuesta no es un arreglo", data);
        }
      } catch (error) {
        console.error("Error fetching stock movements:", error);
      }
    };

    fetchMovements();
  }, []);

  return (
    <div>
      <h1>Stock Movements</h1>
      <table border="1" className="stockMovementsTable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Sector</th>
            <th>Movement Type</th>
            <th>Client/Supplier</th>
            <th>Quantity</th>
            <th>Current Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {/* Verificar que movements es un arreglo antes de mapear */}
          {Array.isArray(movements) && movements.map((movement) => (
            <tr key={movement.id}>
              <td>{movement.productName}</td>
              <td>{movement.sector}</td>
              <td>{movement.type}</td>
              <td>
                {movement.client ? movement.client.name : movement.supplier ? movement.supplier.name : "N/A"}
              </td>
              <td>{movement.quantity}</td>
              <td>{movement.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockMovementTable;
