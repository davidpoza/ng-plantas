FROM node:18
WORKDIR /usr/src/app
COPY ./routes.json routes.json
COPY ./db.json db.json
RUN npm i -g json-server json-server-auth express
EXPOSE 3000
CMD [ "json-server-auth", "--watch", "db.json", "-r", "routes.json", "-H", "0.0.0.0" ]