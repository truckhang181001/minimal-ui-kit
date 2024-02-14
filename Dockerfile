FROM node:latest

WORKDIR /ulangon-application

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start"]