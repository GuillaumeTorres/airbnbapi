AirBnB Like api
=====================

#### Install
```
$ touch .env
$ npm install
$ apt install mongodb
```

##### .env
```
JWT_SECRET=mySecret
MAIL_USERNAME=myUsername
MAIL_PASSWORD=myPassword
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