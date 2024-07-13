const { eventsCollection } = require('../../database/models/eventsModel');

const add_event_controller = async (req, res, next) => {
  try {
    const { title, description, date_event, location, ticket_price, tickets_avaliable } = req.body;
    const response = await eventsCollection.addEvent(title, description, date_event, location, ticket_price, tickets_avaliable);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const get_events_controller = async (req, res, next) => {
  try {
    const response = await eventsCollection.getEvents();
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_events_controller,
  add_event_controller
};