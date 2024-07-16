const database = require('../dbConfig');

const addEvent = async (title, description, date_event, location, ticket_price, tickets_avaliable) => {
try {
    const consulta = "INSERT INTO eventos (title, description, date, location, ticket_price, tickets_avaliable) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [title, description, date_event, location, ticket_price, tickets_avaliable];
    const result = await database.query(consulta, values);
    return result.rowCount ? { msg: 'Evento agregado correctamente', data: result.rows[0] } : { msg: 'Evento no agregado', data: [] };
} catch (error) {
    throw error;
}
};

const getEvents = async () => {
try {
    const consulta = "SELECT * FROM eventos";
    const { rows } = await database.query(consulta);
    return rows.length ? { msg: 'Todos los eventos', data: rows } : { msg: 'No hay eventos', data: [] };
} catch (error) {
    throw error;
}
};

const eventsCollection = {
addEvent,
getEvents
};

module.exports = { eventsCollection };
