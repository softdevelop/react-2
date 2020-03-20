FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -f

ENV DATABASE_URL=mongodb://mongodb:27017/nodejs-temp-mvc

CMD ["npm", "start"]
