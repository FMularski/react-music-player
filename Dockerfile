FROM node

WORKDIR /code

COPY package.json package-lock.json /code/

RUN npm i

COPY . /code/
