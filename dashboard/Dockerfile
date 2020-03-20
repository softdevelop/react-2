# build stage
FROM node:13-alpine as build-stage
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]