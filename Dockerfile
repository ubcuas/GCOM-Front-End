FROM node:18-alpine

EXPOSE 5173

WORKDIR /gcom_frontend

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

COPY  package*.json ./
RUN npm install

COPY . .

RUN npm run build
CMD npm run preview
