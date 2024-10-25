# Archivos sueltos

## docker-compose.yml

archivo docker-compose para el deploy de la db

  

## tslint.json

Archivo de TSLint, define las reglas de estilo y las normas que el código debe seguir

  

## main.ts

Código para iniciar NestJS.

  

## main.hmr.ts

HMR o Hot Module Replacement es una técnica para que una app se actualice en tiempo real sin necesidad de recargar toda la pagina o el servidor.

Se lo pone en un archivo diferente al *main.ts* por una cuestión de orden, ya que se usa para desarrollo,

Es mejor para aplicaciones del lado del servidor.

## nodemon.json

Archivo de configuración de nodemon.

## app.module.ts

Configura todos los módulos de la aplicación y establece la integración con bibliotecas

# auth
## jwt.strategy.ts

Define una estrategia de autenticación JWT personalizada utilizando passport-jwt, que es un middleware para autenticación en aplicaciones de Node.js.

Define una clase JwtStrategy que extiende PassporStrategy con la estrategia strategy proporcionada por passport-jwt, la clase se configura para extraer el toke jwt del encabezado de autorizaciones de las solicitudes http entrantes y validarlo con la clave secreta.

## index.ts

Módulo que se utiliza para exportar y agrupar las exportaciones de múltiples archivos en un solo punto de entrada.

## auth.service.ts

Define el servicio de autenticación para manejar la lógica relacionada con la validación de usuarios y la generación de tokens JWT.

## auth.service.spec.ts

Se utiliza para pruebas unitarias para el AuthService.

## auth.module.ts

Se encarga de gestionar la autenticación de los usuarios mediante jwt y Passport.

## auth.controller.ts

Maneja las solicitudes relacionadas con la autenticación.

# interfaces

## index.ts

Índice de exportación para el módulo que contiene la interfaz JwtPayloadInterface

## jwt-payload.interface.ts

Proporciona una definición del formato del payload del token JWT

# blog

## blog.controller.ts

Define el controlador para gestionar las operaciones relacionadas con los blog para manejar las solicitudes http y definir las rutas que permiten realizar las operaciones CRUD
  

## blog.module.ts

Encapsula todos los componentes relacionados con la funcionalidad de blog, como controladores, servicios, proveedores y cualquier entidad necesaria para interactuar con la base de datos.

## blog.service.spec.ts

Realiza pruebas para las funciones del servicio BlogService, como crear, actualizar, eliminar, y paginar blogs. Además, verifica la funcionalidad de generación de slugs únicos para los títulos de los blogs.

## blog.service.ts

Proporciona la lógica para manejar la creación, actualización, eliminación y recuperación de blogs. Además, contiene métodos para paginar los resultados y asegurar que los slugs de los blogs sean únicos

## index.ts

Sirve para simplificar la importación de los componentes relacionados con el blog en otros módulos o archivos de la aplicación. Al usar export * from '...', estás reexportando todo lo que ha sido exportado desde esos archivos específicos

## slug.provider.spec.ts

Comprueba las funcionalidades del slugprovider.

## slug.provider.ts

Define el proveedor SlugProvider para generar slugs a partir de cadenas de texto.

# config

## database.ts

Configuración de la base de datos para la aplicación

Esta configuración se exporta como un objeto JavaScript y utiliza variables de entorno (process.env) para definir los detalles de conexión de la base de datos.

## jwt.ts

Configuración para el manejo de jwt.

## slugify.ts

Define la configuración para la biblioteca slugify.

# entities

## base.entity.ts

Define una clase abstracta llamada BaseEntity, que se utiliza como base para otras entidades en TypeORM.

## blog.entity.ts

Define una entidad de blog en typeorm para interactuar con la base de datos

## index.ts

Módulo de TypeScript para exportar y agrupar las exportaciones de múltiples archivos en un solo punto de entrada

## user.entity.ts

Define la entidad UserEntity que representa a los usuarios en la base de datos utilizando TypeORM

# models

## auth.model.ts

Define una clase AuthModel que se utiliza para validar los datos de autenticación.

## blog.model.ts

Define una clase BlogModel que utiliza decoradores de class-validator para aplicar validaciones a las propiedades del modelo de blog

## index.ts

Agrupar y reexportar los modelos desde un único punto

## user.model.ts

Define la clase UserModel, que utiliza decoradores de class-validator para validar las propiedades del usuario

# paginate

## index.ts

Exportar varios elementos relacionados con la paginación desde un solo punto

## pagination.options.interface.ts

Define una interfaz para las opciones de paginación

Esta interfaz especifica cómo deberían estructurarse los datos cuando se solicitan paginaciones

## pagination.results.interface.ts

Define una interfaz para estructurar los resultados de una operación de paginación

## pagination.ts

Define una clase Pagination que utiliza la interfaz PaginationResultInterface para estructurar y manejar los resultados de la paginación

# user

## index.ts

Exportar varios elementos relacionados con usuarios desde un solo punto.

## user.controller.ts

Define un controlador en NestJS para manejar las operaciones relacionadas con los usuarios.

## user.module.ts

Define el módulo para gestionar la funcionalidad relacionada con los usuarios.

## user.service.spec.ts

Contiene pruebas unitarias para el servicio UserService.
  
## user.service.ts

Define el servicio UserService para la gestión de usuarios.