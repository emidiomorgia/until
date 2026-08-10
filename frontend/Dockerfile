FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app

RUN npm install --global serve@14.2.4 \
    && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["serve", "dist", "--listen", "tcp://0.0.0.0:80"]
