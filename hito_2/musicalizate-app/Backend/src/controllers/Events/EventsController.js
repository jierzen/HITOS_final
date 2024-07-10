const { eventsCollection } = require('../../database/models/eventsModel')

const add_event_controller = async (req, res, next) => {

    try {
        const { titulo, autor, descripcion, precio, editorial, url_imagen, anio } = req.body

        const response = await eventsCollection.addEvent(titulo, autor, descripcion, precio, editorial, url_imagen, anio)

        res.send(response)

    } catch (error) {
        next(error)
    }
}

const get_events_controller = async (req, res, next) => {

    try {
        const response = await eventsCollection.getEvents()

        res.send(response)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    get_events_controller,
    add_event_controller
}