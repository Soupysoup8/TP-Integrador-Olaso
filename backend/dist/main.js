"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");

async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);

    // Establecer prefijo global para las rutas de la API
    app.setGlobalPrefix('api/v1');

    // Usar validación global
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Habilitar CORS para el frontend que corre en el puerto 3000
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Escuchar en el puerto 3001 para el backend
    await app.listen(3001);
}
bootstrap();