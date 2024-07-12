const router = require('express').Router()

const { get_events_controller, add_event_controller } = require('../../controllers/Events/EventsController')


router.get('/get-all', get_events_controller)

router.post('/add', add_event_controller )


module.exports = router