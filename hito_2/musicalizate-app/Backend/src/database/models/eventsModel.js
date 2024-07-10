const database = require('../dbConfig')


const addEvent = async (title, description, date_event, location, ticket_price, tickets_avaliable) => {

    try {

        const consulta = "INSERT INTO Eventos (title, description, date_event, location, ticket_price, tickets_avaliable) values ($1, $2, $3, $4, $5, $6) RETURNING *"
        const values = [title, description, date_event, location, ticket_price, tickets_avaliable]

        const result = await database.query(consulta, values)

        if (result.rowCount) {

            return {
                msg: 'Evento agregado correctamente',
                data: result.rows[0]
            }

        } else {
            return {
                msg: 'Evento no agregado',
                data: []
            }
        }

    } catch (error) {

        throw error
    }

}

const getEvents = async () => {

    try {

        const consulta = "SELECT * FROM Eventos"

        const { rows } = await database.query(consulta)

        if (rows.length) {

            return {
                msg: 'Todos los Eventos',
                data: rows
            }

        } else {

            return {
                msg: 'No hay eventos',
                data: []
            }
        }

    } catch (error) {
        throw error
    }
}

const eventsCollection = {
    addEvent,
    getEvents
}


module.exports = { eventsCollection }