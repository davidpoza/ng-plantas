FROM node:18
WORKDIR /usr/src/app
COPY ./routes.json routes.json
COPY ./db.json db.json
RUN npm i -g json-server json-server-auth express
CMD [ "json-server-auth", "db.json", "-r", "routes.json" ]
EXPOSE 3000