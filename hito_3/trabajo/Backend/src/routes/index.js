const router = require('express').Router()
const UsersRouter = require('./users/usersRouter')
const EventsRouter = require('./events/eventsRouter')

router.use('/profile/events', EventsRouter)
router.use('/profile', UsersRouter)

module.exports = router
