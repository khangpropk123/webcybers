const user = require('./user')
const article = require('./article')
const serie = require('./series')
const admin = require('./admin')

module.exports = (router) => {
    admin(router)
    user(router)
    article(router)
    serie(router)
}