AirBnB Like api
=====================

#### Install

```
$ echo JWT_SECRET=mySecret > .env
$ npm install
$ apt install mongodb
```
#### Run

```
$ npm start
```

#### MongoDB
```
$ mongo
$ show dbs
$ use airbnbapi
$ show collections
$ db.users.find()
```

#### ApiDoc
```
$ npm run apidoc
```
Custom
```
$ node_modules/apidoc/bin/apidoc -i routes/ -o doc/
```