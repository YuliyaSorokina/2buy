# Stage 0: Build app
# docker build --build-arg BE_HOST=http://192.168.3.9 --build-arg BE_PORT=8080 -t 2buy-frontend .
FROM node:16-alpine3.11 as node_builder

COPY package.json package-lock.json ./

RUN npm config set depth 0 && npm cache clean --force &&  npm i && mkdir /app && mv ./node_modules ./app/node_modules

COPY ./ /app
WORKDIR /app

ARG BE_HOST
ARG BE_PORT
RUN sed -i nginx.default.conf -e s#%backend_scheme_and_host%#"$BE_HOST"# \
 && sed -i nginx.default.conf -e s#%backend_port%#"$BE_PORT"# \
 && npm run build

# STAGE 1: Setup nginx and copy dist
FROM nginx:1.13.9-alpine

COPY --from=node_builder /app/nginx.default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node_builder /app/build/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

