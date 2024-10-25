# Apuntes de Nestjs

Esto es una ayuda para recordar la funcionalidad del orden de los archivos y la utilidad de cada uno. En caso de no entender alguna explicación, no tengan problema en actualizarlo

# Conceptos
-   **Módulo**:
    
    -   Clase que organiza y agrupa código relacionado, como controladores, servicios y otros módulos. Es el núcleo de la estructura de la aplicación y ayuda a mantener el código modular y organizado.
  
-   **Servicio**:
    
    -   Un servicio es una clase que contiene la lógica de negocio de la aplicación. Maneja las operaciones y cálculos necesarios para cumplir con las funcionalidades específicas. Los servicios son inyectables, lo que significa que pueden ser utilizados por otros componentes, como controladores o módulos.
-   **Entidad**:
    
    -   Una entidad es una clase que representa una tabla en la base de datos. Define la estructura de los datos, incluyendo las propiedades (columnas) y relaciones con otras entidades. Se usa principalmente con bibliotecas de mapeo objeto-relacional (ORM), como TypeORM.
-   **Modelo**:
    
    -   Un modelo es similar a una entidad, pero se usa más en el contexto de manipulación de datos dentro de la aplicación, especialmente en aplicaciones que no usan un ORM. Define la estructura y las reglas de validación de los datos que maneja la aplicación.
-   **Controlador**:
    
    -   Un controlador es una clase que maneja las solicitudes HTTP y las respuestas. Define las rutas (endpoints) de la aplicación y delega las operaciones necesarias a los servicios. Es el intermediario entre el cliente (por ejemplo, una aplicación frontend) y la lógica de negocio de la aplicación.

# Archivos
## main.ts

Dónde se coloca todo el código principal para iniciar NestJS

## app.module.ts

Configura todos los módulos en la aplicación y establece la integración con bibliotecas.

## index.ts

Agrupa y exporta múltiples archivos en un solo punto de entrada.

## x.service.ts

Contiene la lógica del servicio.

## x.x.spec.ts

Pruebas para ciertas funcionalidades y objetos explícitamente creados para verificar que todo funcione correctamente.

## x.module.ts

Se encarga de gestionar 

## x.entity.ts
Definen las entidades de datos.

## x.model.ts
Definen los modelos de datos.

## x.controller.ts
Controla las rutas y las solicitudes HTTP.