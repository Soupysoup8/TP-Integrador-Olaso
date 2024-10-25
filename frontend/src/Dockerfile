# Usar una versión LTS de Node para mayor estabilidad
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json si existen
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que la aplicación va a usar
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
