import React from "react";
import Menubar from "../components/menu/Menubar";

function HomePage() {
    return(
        <div>
            <Menubar/>

            <div className="contenido">
            <h1>¡Bienvenidos!</h1>

            <h2>¿Quiénes somos?</h2>
            <p>En <strong>La Semilla Valiente</strong>, nos especializamos en ofrecer soluciones de maquinaria agrícola y productos químicos esenciales para el sector agrícola, tales como semillas y fertilizantes. Nos dedicamos a garantizar que nuestros clientes cuenten con los productos que necesitan, en el momento preciso y con la calidad que esperan. Nuestra empresa tiene un alcance tanto local como internacional, lo que nos permite estar presentes donde más se nos necesita.</p>

            <h2>¿Cuál es nuestro enfoque?</h2>
            <p>Creemos en la eficiencia y el compromiso. Por eso, hemos implementado un sistema de control de stock altamente organizado, utilizando tecnología avanzada como NFC y QR para gestionar tanto la entrada como la salida de productos y de nuestro equipo. Almacenamos nuestros productos en pallets en un depósito con las medidas de seguridad necesarias, garantizando así una operación fluida y sin contratiempos. Además, nos esforzamos por crear un ambiente de trabajo colaborativo, donde todos nuestros empleados se sientan parte fundamental del éxito de la empresa.</p>

            <h2>Les agradecemos</h2>
            <p>Agradecemos profundamente a cada uno de ustedes por ser parte de <strong>La Semilla Valiente</strong>. Juntos, estamos sembrando el futuro de la agricultura, y su dedicación y esfuerzo son esenciales para que sigamos creciendo y alcanzando nuevos logros. ¡Gracias por su compromiso y por formar parte de este gran proyecto!</p>
            
            </div>
            
        </div>
    )
}

export default HomePage;