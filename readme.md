# Restaurant Review Website 
A simple restaurant review website build with Bootstrap 5.0 framework, MySQL, Express and NodeJS. I designed the UI/UX on Adobe XD. 

#### Dependencies
This web application runs on Node.JS and requires the following packages. 
* bcrypt 
* body-parser 
* bootstrap 5.0
* dotenv
* easy-livereload
* express
* jsonwebtoken
* mysql 
* node-dev 
* nodemon 

## Setting up

1. Create a new MySQL schema and import the attached .sql file

2. Create an .env file with the following fields
``` 
DB_HOST = (your-db-host, usually localhost)
DB_PORT = (your-db-port, usually 3306)
DB_USER = (your-username)
DB_PASSWORD = (your-password)
DB_NAME = (db-name)
JSONTOKEN_KEY = (any-random-key)
JSONTOKEN_EXPIRE = 1h
```
3. Launch the web application 
```npm start``` or ```node server.js```

### References 
* [Build RESTful APIs with NodeJS, Express and MySQL | Authentication with JWT](https://www.youtube.com/watch?v=WfCJ3sHnLBM)
* [How To Build REST API with NodeJS, Express and MySQL](https://dev.to/juliest88/how-to-build-rest-api-with-nodejs-express-and-mysql-31jk_)
* [Implmenting Role-Based Access Control in NodeJS](https://soshace.com/implementing-role-based-access-control-in-a-node-js-application/)
* [Node.js - Role Based Authorization Tutorial](https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api)
* [Royalty Free Stock Photos](https://pexels.com)

### Useful Documentations
* [Express Routing](https://expressjs.com/en/guide/routing.html)
* [JSON Web Tokens](https://jwt.io/introduction)

### Personal Links
* [Project GitHub Page](https://github.com/sallihin/restaurant-review)
* [100 Days of Code](https://instagram.com/mmw.codes)
