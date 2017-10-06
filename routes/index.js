var userRoutes = require('./users')

module.exports = function routes(app){
    app.use('/users', userRoutes)
}
