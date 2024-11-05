FROM node:alpine

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY . /usr/src/app

RUN npm install

RUN ng build --configuration production

CMD ["ng", "serve", "--host", "0.0.0.0"]

