import { useState } from 'react';

function FormProduct() {
    const [productData, setProductData] = useState({
        name: '',
        sector: '',
        brand: '',
        stock: {
            base_quantity: 0,
            min_quantity: 0,
            max_quantity: 0
        }
    });

    const [message, setMessage] = useState(''); // Estado para el mensaje de confirmación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleStockChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            stock: {
                ...productData.stock,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convertir las cantidades a números
        const { base_quantity, min_quantity, max_quantity } = productData.stock;
        const updatedProductData = {
            ...productData,
            stock: {
                ...productData.stock,
                base_quantity: Number(base_quantity), // Asegurarse de que sea un número
                min_quantity: Number(min_quantity),
                max_quantity: Number(max_quantity)
            }
        };
    
        // Verificar los valores numéricos
        if (updatedProductData.stock.base_quantity <= 0 || updatedProductData.stock.min_quantity <= 0 || updatedProductData.stock.max_quantity <= 0) {
            console.error('Los valores de cantidad deben ser números positivos.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(`Producto creado exitosamente: ${result.name}`);
                alert(`Producto creado con ID de stock: ${result.stockId}`);
            } else {
                const error = await response.json();
                setMessage(`Error al crear el producto: ${error.message || 'Intente de nuevo.'}`);
            }
        } catch (error) {
            setMessage(`Error de conexión: ${error.message}`);
        }
    };    
    

    return (
        <form onSubmit={handleSubmit} className='formProduct'>
            <h2>Formulario de Producto</h2>

            <label>
                Nombre:
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                />
            </label>


            <label>Sector</label>
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


            <label>
                Marca:
                <input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    required
                />
            </label>

            <h3>Stock</h3>

            <label>
                Cantidad base:
                <input
                    type="number"
                    name="base_quantity"
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
                    value={productData.stock.max_quantity}
                    onChange={handleStockChange}
                    required
                />
            </label>

            <button type="submit">Guardar Producto</button>
        </form>
    );
}

export default FormProduct;
