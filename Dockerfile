FROM node:23-alpine3.20

RUN apk add --no-cache bash

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "dev"]
