FROM node:14

WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install http-server -g && apt-get update && apt-get install -y git

RUN npm install && npm run build

CMD http-server ./dist