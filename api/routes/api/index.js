const router = require('express').Router()
const oauthRoute = require('./oauth')
const testRoute = require('./test')
const usersRoute = require('./users')
const resultsRoute = require('./results')

router.use('/oauth', oauthRoute)

router.use('/test', testRoute)

router.use('/users', usersRoute)

router.use('/results', resultsRoute)

router.get('/*', function (req, res) {
    res.send('Api v1')
})

module.exports = router
