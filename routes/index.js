let userRoutes = require('./user')

module.exports = function routes(app){
    app.use('/user', userRoutes)
}
