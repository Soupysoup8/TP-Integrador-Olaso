# Usa una imagen de Node LTS
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que correrá NestJS
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]