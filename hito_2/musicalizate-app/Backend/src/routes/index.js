const router = require('express').Router()
const EventsRouter = require('./events/eventsRouter')
const UsersRouter = require('./users/usersRouter')

router.use('/profile/events', EventsRouter)
router.use('/profile', UsersRouter)

module.exports = router
