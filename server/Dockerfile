FROM node:14.17-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
#RUN yarn install

RUN yarn install --production=true

COPY . .

CMD [ "yarn", "start" ]
