FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn run build

FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]