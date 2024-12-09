FROM node:latest

WORKDIR /usr/src/cloud-computing/server

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
