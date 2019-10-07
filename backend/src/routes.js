const express = require('express')
const SessionController = require('./controllers/SessionControler')
const routes = express.Router()

routes.post('/session', SessionController.store)

module.exports = routes