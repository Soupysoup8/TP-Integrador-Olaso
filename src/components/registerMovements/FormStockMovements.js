
/*
import { useState } from 'react';

function FormStockMovement({ stockId }) {
    const [movementData, setMovementData] = useState({
        quantity: '',
        type: 'entrada', // Predeterminado a 'entrada'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovementData({
            ...movementData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de cantidad
        if (movementData.quantity <= 0) {
            alert('La cantidad debe ser un número positivo.');
            return;
        }

        const response = await fetch(`http://localhost:3001/api/tpOlaso/v0/stock/${stockId}/movement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movementData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Movimiento creado:', result);
            alert('Movimiento de stock registrado correctamente');
        } else {
            console.error('Error al registrar el movimiento');
            alert('Error al registrar el movimiento');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formStockMovement'>
            <h2>Registrar Movimiento de Stock</h2>

            <label>
                Tipo de Movimiento:
                <select
                    name="type"
                    value={movementData.type}
                    onChange={handleChange}
                >
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
            </label>

            <label>
                Cantidad:
                <input
                    type="number"
                    name="quantity"
                    value={movementData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </label>

            <button type="submit">Registrar Movimiento</button>
        </form>
    );
}

export default FormStockMovement;

*/

import { useState, useEffect } from 'react';

function FormStockMovement() {
    const [productData, setProductData] = useState({
        productId: '',
        movementType: '',
        quantity: 0
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Obtener productos disponibles desde el backend
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/product');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quantity = Number(productData.quantity);

        if (isNaN(quantity) || quantity <= 0) {
            alert('La cantidad debe ser un número positivo.');
            return;
        }

        try{
        // Validar que la cantidad sea positiva
        if (productData.quantity <= 0) {
            alert('La cantidad debe ser un número positivo.');
            return;
        }

        const response = await fetch(`http://localhost:3001/api/tpOlaso/v0/product/${productData.productId}/update-movement`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: productData.movementType,
                quantity: quantity
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error:', error);
            alert(`Error al registrar el movimiento: ${error.message || error}`);
        }
        }
        catch (error) {
            alert('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formStockMovement'>
            <h2>Formulario de Movimiento de Stock</h2>

            <label>
                Producto:
                <select
                    name="productId"
                    value={productData.productId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un producto</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Tipo de Movimiento:
                <select
                    name="movementType"
                    value={productData.movementType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un tipo de movimiento</option>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
            </label>

            <label>
                Cantidad:
                <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </label>

            <button type="submit">Registrar Movimiento</button>
        </form>
    );
}

export default FormStockMovement;
