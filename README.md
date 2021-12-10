# nodejs-express-sequelize-postgresql

## Introduction

CRUD REST api server

## Node.js Module

- `express` : express is for building the Rest apis
- `body-parser` : [body-parser](https://www.npmjs.com/package/body-parser) helps to parse the request and create the req.body object
- `cors` : [cors](https://www.npmjs.com/package/cors) provides Express middleware to enable CORS with various options.

## Available resources

The following resources are available:

- `POST /api/posts` (`Data Type : JSON`) : create a new Post: create(object)
- `GET /api/posts/:id` : find a Post by id: findByPk(id)
- `GET /api/posts` : get all Posts: findAll()
- `PUT /api/posts/:id` : update a Post by id: update(data, where: { id: id })
- `DELETE /api/posts/:id` : remove a Post: destroy(where: { id: id })
- `DELETE /api/posts` : remove all Posts: destroy(where: {})
- `GET /api/published` : find all Posts by title: findAll({ where: { title: ... } })

## Project setup

```
npm install
```

## Project run

```
node server.js
```

### Reference

[https://bezkoder.com/node-express-sequelize-postgresql/](https://bezkoder.com/node-express-sequelize-postgresql/)
