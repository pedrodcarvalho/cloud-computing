# Dockerfile para o Backend
FROM node:latest

# Defina o diretório de trabalho
WORKDIR /usr/src/cloud-computing/server

# Copie os arquivos do projeto
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Exponha a porta que o servidor está escutando
EXPOSE 5000

# Inicie o servidor
CMD ["node", "server.js"]
