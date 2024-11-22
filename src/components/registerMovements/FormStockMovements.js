import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* TODO: poner bien la cantidad de stock actual */

function FormStockMovement() {
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [clients, setClients] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  
    const [filteredClients, setFilteredClients] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [selectedClientIds, setSelectedClientIds] = useState([]);
    const [selectedSupplierIds, setSelectedSupplierIds] = useState([]);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState({
        productId: 0,
        movementType: 'entrada',
        quantity: 1,
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const quantity = Number(productData.quantity);
        if (isNaN(quantity) || quantity <= 0) {
            alert('La cantidad debe ser un número positivo.');
            return;
        }
    
        // Verificar producto seleccionado y stock
        const selectedProduct = products.find(p => p.id === Number(productData.productId));
        const stockId = selectedProduct?.stock?.id;
    
        if (!stockId) {
            alert('El producto seleccionado no tiene stock asociado.');
            return;
        }
    
        console.log('Clientes seleccionados:', selectedClientIds);
        console.log('Proveedores seleccionados:', selectedSupplierIds);
        console.log('Producto seleccionado:', selectedProduct);
        console.log('Cantidad enviada:', productData.quantity);
    
        // Primero, actualizar el stock con PATCH
        try {
            const patchResponse = await fetch(`http://localhost:3001/api/tpOlaso/v0/stock/${productData.productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: Number(productData.productId),
                    base_quantity: Number(productData.quantity),  // Cantidad a actualizar
                }),
            });
    
            if (patchResponse.status !== 200 && patchResponse.status !== 201) {
                const errorData = await patchResponse.json();
                alert(`Error al actualizar el stock: ${errorData.message}`);
                console.log('Error en el PATCH:', errorData);
                return;
            }
    
            // Luego, registrar el movimiento de stock con POST
            const postResponse = await fetch('http://localhost:3001/api/tpOlaso/v0/stock/movement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    sector,
                    selectedClientIds: selectedClientIds.map(id => parseInt(id)),
                    selectedSupplierIds: selectedSupplierIds.map(id => parseInt(id)),
                    productId: Number(productData.productId),
                    movementType: productData.movementType,
                    quantity: Number(productData.quantity),
                }),
            });
    
            if (postResponse.status === 200 || postResponse.status === 201) {
                alert('Movimiento registrado exitosamente!');
                navigate('/registerEntities');
            } else {
                const errorData = await postResponse.json();
                alert(`Error en el registro del movimiento: ${errorData.message}`);
                console.log('Error en la respuesta del POST:', errorData);
            }
        } catch (error) {
            console.error('Error al registrar el movimiento:', error);
            alert('Hubo un problema con el registro.');
        }
    };
    

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        if (productData.movementType === "salida") {
            setFilteredClients(clients.filter(client => client.name.toLowerCase().includes(query)));
        } else {
            setFilteredSuppliers(suppliers.filter(supplier => supplier.name.toLowerCase().includes(query)));
        }
    };
    

    const toggleClientSelection = (clientId) => {
        setSelectedClientIds(prevSelected =>
            prevSelected.includes(clientId)
                ? prevSelected.filter(id => id !== clientId)
                : [...prevSelected, clientId]
        );
    };

    const toggleSupplierSelection = (supplierId) => {
        setSelectedSupplierIds(prevSelected =>
            prevSelected.includes(supplierId)
                ? prevSelected.filter(id => id !== supplierId)
                : [...prevSelected, supplierId]
        );
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchClientsAndSuppliers = async () => {
            try {
                const clientsResponse = await fetch('http://localhost:3001/api/tpOlaso/v0/client');
                const suppliersResponse = await fetch('http://localhost:3001/api/tpOlaso/v0/supplier');

                if (clientsResponse.ok && suppliersResponse.ok) {
                    const clientsData = await clientsResponse.json();
                    const suppliersData = await suppliersResponse.json();
                    setClients(clientsData);
                    setSuppliers(suppliersData);
                    setFilteredClients(clientsData);
                    setFilteredSuppliers(suppliersData);
                } else {
                    throw new Error('Error al obtener los datos');
                }
            } catch (error) {
                console.error('Error al obtener clientes y proveedores:', error);
                alert('Hubo un problema al cargar los clientes o proveedores.');
            }
        };

        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/product/product-with-stock');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Error al obtener los productos:', response.statusText);
            }
        };

        fetchClientsAndSuppliers();
        fetchProducts();
    }, []);

    return (
        <div id="divStockMovement">
            <form onSubmit={handleSubmit} id="formStockMovement">
                <h2>Movimiento de Stock</h2>

                <div className="container">
                    <div className='movementSection'>
                        <label>Producto:</label>
                        <select
                            name="productId"
                            value={productData.productId}
                            onChange={handleProductChange}
                            required
                        >
                            <option value="">Seleccione un producto</option>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name ? `${product.name} - Stock disponible: ${product.stock?.actual_quantity || 0}` : 'Nombre no disponible'}
                                    </option>
                                ))
                            ) : (
                                <option>No hay productos disponibles</option>
                            )}
                        </select>

                        <label>Tipo de Movimiento:</label>
                        <select
                            name="movementType"
                            value={productData.movementType}
                            onChange={handleProductChange}
                            required
                        >
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                        </select>

                        <label>Cantidad:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleProductChange}
                            required
                            min="1"
                        />        
                    </div>        

                    <div className='supplierClientSection'>
                        {productData.movementType === "salida" && (
                            <>
                                <label>Cliente:</label>
                                <div className="divClientUl">
                                    <ul className="clientUl">
                                        {selectedClientIds.map(clientId => {
                                            const client = clients.find(c => c.id === clientId);
                                            return client ? <li key={clientId} className="clientLi">{client.name}</li> : null;
                                        })}
                                    </ul>
                                </div>

                                <input
                                    id="inputSearchQuery"
                                    type="text"
                                    placeholder="Buscar clientes..."
                                    onChange={handleSearchChange}
                                />

                                <div className="menuClients">
                                    <ul>
                                        {filteredClients.length > 0 ? (
                                            filteredClients.map((client) => (
                                                <li key={client.id}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedClientIds.includes(client.id)}
                                                            onChange={() => toggleClientSelection(client.id)}
                                                        />
                                                        {client.name}
                                                    </label>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No hay proveedores disponibles</li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}

                        {productData.movementType === "entrada" && (
                            <>
                                <label>Proveedores:</label>
                                <div className="divSupplierUl">
                                    <ul className="supplierUl">
                                        {selectedSupplierIds.map(suppliersId => {
                                            const supplier = suppliers.find(s => s.id === suppliersId);
                                            return supplier ? <li key={suppliersId} className="supplierLi">{supplier.name}</li> : null;
                                        })}
                                    </ul>
                                </div>

                                <input                    
                                    id="inputSearchQuery"
                                    type="text"
                                    placeholder="Buscar proveedores..."
                                    onChange={handleSearchChange}
                                />

                                <div className="menuSuppliers">
                                    <ul>
                                        {filteredSuppliers.length > 0 ? (
                                            filteredSuppliers.map((supplier) => (
                                                <li key={supplier.id}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedSupplierIds.includes(supplier.id)}
                                                            onChange={() => toggleSupplierSelection(supplier.id)}
                                                        />
                                                        {supplier.name}
                                                    </label>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No hay proveedores disponibles</li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}


export default FormStockMovement;

/*

function FormStockMovement() {
    const [productData, setProductData] = useState({
        productId: '',
        movementType: '',
        quantity: 0
    });

    const [filteredClients, setFilteredClients] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");  
    const [selectedClientsIds, setSelectedProductIds] = useState([]);  // Cambié el nombre a selectedProductIds
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered); 
    };

    const toggleProductSelection = (productId) => {
        setSelectedProductIds((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/client');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);  
            } else {
                console.error('Error al obtener los productos:', response.statusText);
                alert('Hubo un problema al cargar los productos.');
            }
        };        
        fetchClients();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/product/product-with-stock');
            if (response.ok) {
                const data = await response.json();
                console.log('Productos recibidos:', data);
                setProducts(data);
            } else {
                console.error('Error al obtener los productos:', response.statusText);
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

        const selectedProduct = products.find(p => p.id === Number(productData.productId)); // Conversión segura
        const stockId = selectedProduct?.stock?.id;

        if (!stockId) {
            alert('El producto seleccionado no tiene stock asociado.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/tpOlaso/v0/product/${productData.productId}/update-movement`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: productData.movementType,
                    quantity
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error:', error);
                alert(`Error al registrar el movimiento: ${error.message || error}`);
            } else {
                alert('Movimiento de stock registrado correctamente');
            }
        } catch (error) {
            console.error('Error al registrar el movimiento', error);
            alert('Error al registrar el movimiento');
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
                {products.length > 0 ? (
                    products.map(product => {
                        console.log('Producto en mapeo:', product); // Depuración
                        return (
                            <option key={product.id} value={product.id}>
                                {product.name ? `${product.name} - Stock disponible: ${product.stock?.actual_quantity || 1}` : 'Nombre no disponible'}
                            </option>
                        );
                    })
                ) : (
                    <option>No hay productos disponibles</option>
                )}
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
*/