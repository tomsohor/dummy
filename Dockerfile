FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm install

CMD [ "node", "index.js" ]
EXPOSE 3000