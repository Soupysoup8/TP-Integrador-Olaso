import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function FormClient() {
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [products, setProducts] = useState([]); 
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [searchQuery, setSearchQuery] = useState("");  
    const [selectedProductIds, setSelectedProductIds] = useState([]);  // Cambié el nombre a selectedProductIds
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const navigate = useNavigate();
  
    const handleClientForm = async (e) => {
        e.preventDefault();
    
        console.log('Productos seleccionados:', selectedProductIds);  // Verifica el contenido de selectedProductIds
        
        try {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    sector,
                    address,
                    contact,
                    email,
                    selectedProductIds: selectedProductIds.map(id => parseInt(id))  // Asegúrate de que los IDs sean números enteros
                })
            });
    
            if (response.status === 200 || response.status === 201) {
                alert('Cliente registrado exitosamente!');
                navigate('/registerEntities');
            } else {
                const errorData = await response.json();
                alert(`Error en el registro: ${errorData.message}`);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Hubo un problema con el registro.');
        }
    };    
    

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

    const handleDropdownToggle = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3001/api/tpOlaso/v0/product/product-with-stock');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);  
            } else {
                console.error('Error al obtener los productos:', response.statusText);
                alert('Hubo un problema al cargar los productos.');
            }
        };        
        fetchProducts();
    }, []);

    return(
        <div id="divFormClient" className="formClient">
    <form onSubmit={handleClientForm} id="formClient">
        <h2>Registro de Cliente</h2>
        <div className="container">
            <div className="clientSection">
                <label>Nombre del cliente/empresa:</label>
                <input 
                    id="nameClient"
                    type="text"
                    aria-label="Ingrese el nombre/empresa del cliente"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Sector:</label>
                <select
                    id="sector"
                    aria-label="Seleccione un sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                >
                    <option value="">Seleccione un sector</option>
                    <option value="agricultura">Agricultura</option>
                    <option value="maquinaria">Maquinaria</option>
                </select>

                <label>Dirección:</label>
                <input 
                    id="addressClient"
                    type="text"
                    aria-label="Ingrese la direccion del cliente"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label>Contacto:</label>
                <input 
                    id="contactClient"
                    type="text"
                    aria-label="Ingrese el contacto del cliente"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />

                <label>Email:</label>
                <input 
                    id="emailClient"
                    type="email"
                    aria-label="Ingrese el email del cliente"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="productSectionEntities">
                <label>Productos:</label>
                <div className="divProductosUl">
                    <ul className="productosUl">
                        {selectedProductIds.map(productId => {
                            const product = products.find(p => p.id === productId);
                            return product ? <li key={productId} className="productosLi">{product.name}</li> : null;
                        })}
                    </ul>
                </div>

                <input
                    id="inputSearchQuery"
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    aria-label="Buscar productos"
                />

                <div className="menuProducts">
                    <ul>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <li key={product.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedProductIds.includes(product.id)}
                                            onChange={() => toggleProductSelection(product.id)}
                                        />
                                        {product.name}
                                    </label>
                                </li>
                            ))
                        ) : (
                            <li>No hay productos disponibles</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        <button type="submit">Guardar</button>
    </form>
</div>

    );
}

export default FormClient;
