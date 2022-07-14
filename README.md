  

## Description

  
In this repository you will have access to a project developed in nest.js
With the following features:
1- When adding a domain to search on the frontend, this application will be able to return all images from that site
2- Images will be converted to grayscale and uploaded to mongodb database
3- Will be sent to the frontend using socket.io as demand for images are processed
  

## Installation

  

```bash

$ npm install

```

  

## Running the app

  

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

  

# production mode

$ npm run start:prod

```

  

## Database Docker

  

```bash

# unit tests

docker run -d --name scrap-mongo \

-p 27017:27017 \

-e MONGO_INITDB_ROOT_USERNAME=your user \

-e MONGO_INITDB_ROOT_PASSWORD=your password \

mongo


```


  

## Stay in touch
 

- Author - [Henrique Guedes](https://www.linkedin.com/in/luis-henrique-64b13b40/) Stay in touch

