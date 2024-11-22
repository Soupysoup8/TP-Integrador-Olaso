import React, { useEffect, useState } from "react";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tpOlaso/v0/product/details");
        const data = await response.json();
        
        // Filtrar productos con estado 'activo'
        const activeProducts = data.filter(product => product.state !== 'inactivo');
        setProducts(activeProducts);

        
        // Verificar si hay productos con stock 0
        const outOfStock = activeProducts.filter(product => product.stock?.actual_quantity === 0);
        setOutOfStockProducts(outOfStock);

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Detalles de los Productos</h1>
      {outOfStockProducts.length > 0 && (
        <div className="alertaStock">
          ¡Alerta! Los siguientes productos están sin stock:{" "}
          {outOfStockProducts.map(product => product.name).join(", ")}
        </div>
      )}
      <table border="1" className="tableProducts">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre del Producto</th>
            <th>Marca</th>
            <th>Cantidad Stock</th>
            <th>Sector</th>
            <th>Clientes</th>
            <th>Proveedores</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.stock?.actual_quantity || 0}</td>
              <td>{product.sector}</td>
              <td>
                {product.requestsClient?.map((req) => req.client.name).join(", ")}
              </td>
              <td>
                {product.requestsSupplier?.map((req) => req.supplier.name).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
