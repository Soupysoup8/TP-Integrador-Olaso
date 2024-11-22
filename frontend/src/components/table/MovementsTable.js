import React, { useEffect, useState } from "react";

const StockMovementTable = () => {
  const [movements, setMovements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tpOlaso/v0/stock");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Asegurarse de que clientName y supplierName estén correctamente asignados
          const formattedData = data.map((movement) => ({
            ...movement,
            clientName: movement.client ? movement.client.name : null,
            supplierName: movement.supplier ? movement.supplier.name : null
          }));
          setMovements(formattedData);
          setError(null);
        } else {
          throw new Error("La respuesta no es un arreglo.");
        }
      } catch (error) {
        console.error("Error fetching stock movements:", error);
        setError("No se pudieron cargar los movimientos de stock.");
      }
    };

    fetchMovements();
  }, []);

  return (
    <div>
      <h1>Detalle de los Movimientos de Stock</h1>
      <table border="1" className="tableStockMovements">
        <thead>
          <tr>
            <th>Id</th>
            <th>Producto</th>
            <th>Sector</th>
            <th>Tipo de Movimiento</th>
            <th>Cliente/Proveedor</th>
            <th>Cantidad Movimiento</th>
            <th>Cantidad Actual</th>
          </tr>
        </thead>
        <tbody>
          {movements
            .sort((a, b) => b.id - a.id) // Ordena los movimientos en orden descendente por id
            .map((movement) => (
              <tr key={movement.id}>
                <td>{movement.id}</td>
                <td>{movement.productName}</td>
                <td>{movement.sector}</td>
                <td>
                  {movement.type === "salida"
                    ? "salida" || "N/A" 
                    : "entrada" || "N/A"} 
                </td>
                <td>
                  {movement.type === "salida"
                    ? movement.client || "N/A"
                    : movement.supplier || "N/A"}
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
