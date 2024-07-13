const router = require('express').Router()
const EventsRouter = require('./events/eventsRouter')
const UsersRouter = require('./users/usersRouter')
const loginRouter = require('../routes/users/login.router')

router.use('/profile/events', EventsRouter)
router.use('/login', loginRouter)
router.use('/profile', UsersRouter)

module.exports = router
