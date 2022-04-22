FROM node:v16.13.1-alpine
MAINTAINER @underdef

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]
