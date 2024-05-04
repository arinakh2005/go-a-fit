# build
FROM node:20.11.1 AS development

WORKDIR /home/frontend/src/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 4200