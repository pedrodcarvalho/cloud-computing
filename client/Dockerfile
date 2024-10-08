# Dockerfile para o Frontend
FROM node:latest AS build

# Defina o diretório de trabalho
WORKDIR /cloud-computing/client

# Copie os arquivos do projeto
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Construa a aplicação
RUN npm run build

# Serve a aplicação com Nginx
FROM nginx:alpine
COPY --from=build /cloud-computing/client/build /usr/share/nginx/html
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
