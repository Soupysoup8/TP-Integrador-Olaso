import { useState } from 'react';

function FormProduct() {
    const [productData, setProductData] = useState({
        name: '',
        sector: '',
        brand: '',
        stock: {
            base_quantity: 1,
            actual_quantity: 1, // Inicializamos la cantidad actual igual a la base
            min_quantity: 1,
            max_quantity: 1
        }
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si el campo no está relacionado con el stock, actualiza el estado del producto normal
        if (name !== "base_quantity" && name !== "min_quantity" && name !== "max_quantity") {
            setProductData({
                ...productData,
                [name]: value
            });
        }
    };

    const handleStockChange = (e) => {
        const { name, value } = e.target;
    
        setProductData(prevState => ({
            ...prevState,
            stock: {
                ...prevState.stock,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Asignar base_quantity como actual_quantity al crear el producto
        const { base_quantity, min_quantity, max_quantity } = productData.stock;
    
        const updatedProductData = {
            product: {
                name: productData.name,
                sector: productData.sector,
                brand: productData.brand,
            },
            stock: {
                base_quantity: Number(base_quantity),
                actual_quantity: Number(base_quantity), // La cantidad actual es igual a la base
                min_quantity: Number(min_quantity),
                max_quantity: Number(max_quantity),
            },
        };
    
        // Verificar los valores numéricos
        if (updatedProductData.stock.base_quantity <= 0 || updatedProductData.stock.min_quantity <= 0 || updatedProductData.stock.max_quantity <= 0) {
            alert('Los valores de cantidad deben ser números positivos.');
            return;
        }
    
        // Verificar que la cantidad mínima no sea mayor que la máxima
        if (updatedProductData.stock.min_quantity > updatedProductData.stock.max_quantity) {
            alert('La cantidad mínima no puede ser mayor que la cantidad máxima.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/product/product-with-stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData), // Enviar los datos con la estructura correcta
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Producto creado exitosamente: ${result.name}`);
            } else {
                const error = await response.json();
                alert(`Error al crear el producto: ${error.message || 'Intente de nuevo.'}`);
            }
        } catch (error) {
            alert(`Error de conexión: ${error.message}`);
        }
    };    

    return (
        <div id="divFormProduct">
        <form onSubmit={handleSubmit} id='formProduct'>
            <h2>Registro de Producto</h2>

            <div className='container'>
                <div className='createProductSection'>
                    <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                        />

                    <label>Sector:</label>
                    <select
                        name="sector"
                        value={productData.sector}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un sector</option>
                        <option value="agricultura">Agricultura</option>
                        <option value="maquinaria">Maquinaria</option>
                    </select>

                    <label>Marca:</label>
                        <input
                            type="text"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                            required
                    />
                </div>

                <div className='stockSection'>
                    <h3>Agregue los detalles del stock</h3>
                    <label>
                        Cantidad base:
                        <input
                            type="number"
                            name="base_quantity"
                            min="1" pattern="^[0-9]+"
                            value={productData.stock.base_quantity}
                            onChange={handleStockChange}
                            required
                        />
                    </label>

                    <label>
                        Cantidad mínima:
                        <input
                            type="number"
                            name="min_quantity"
                            min="1" pattern="^[0-9]+"
                            value={productData.stock.min_quantity}
                            onChange={handleStockChange}
                            required
                        />
                    </label>

                    <label>
                        Cantidad máxima:
                        <input
                            type="number"
                            name="max_quantity"
                            min="1" pattern="^[0-9]+"
                            value={productData.stock.max_quantity}
                            onChange={handleStockChange}
                            required
                        />
                    </label>
                </div>

                <button type="submit">Guardar</button>

                </div>
            </form>
            
        </div>
    );
}

export default FormProduct;