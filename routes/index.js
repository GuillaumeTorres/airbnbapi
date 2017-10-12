let userRoutes = require('./user')
let authRoutes = require('./auth')
let bookRoutes = require('./book')
let jwt = require('jsonwebtoken')

let checkToken = (req, res, next) => {
    try{
        // Bearer myToken
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        console.log('errrr')
        res.sendStatus(400)
    }
}

module.exports = function routes(app){
    app.use('/user', checkToken, userRoutes)
    app.use('/book', bookRoutes)
    app.use('/auth', authRoutes)
}
