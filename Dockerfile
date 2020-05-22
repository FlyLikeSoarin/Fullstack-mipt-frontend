
FROM node:current-alpine as static-builder

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build


FROM nginx:stable-alpine
EXPOSE 80

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx
COPY ./mime.types /etc/nginx

RUN mkdir /usr/share/nginx/html/Fullstack-mipt-frontend

COPY --from=static-builder /app/build/ /usr/share/nginx/html/Fullstack-mipt-frontend/
COPY --from=static-builder /app/build/index.html /usr/share/nginx/html/index.html
