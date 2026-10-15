# Production image: build the CRA bundle once, then serve it as static files.
# (This used to run `npm run start` — the dev server: unminified JS, source
# maps and a hot-reload socket, all paid for as data transfer out.)

FROM node:20-alpine AS build

WORKDIR /ulangon-application

COPY package*.json ./

RUN npm install

COPY . .

# REACT_APP_* values come from .env at BUILD time and are baked into the
# bundle — rebuild after changing them. The heap bump keeps webpack from
# running out of memory on the mapbox/apexcharts/MUI bundle.
ENV GENERATE_SOURCEMAP=false \
    NODE_OPTIONS=--max-old-space-size=2048

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /ulangon-application/build /usr/share/nginx/html

EXPOSE 80
