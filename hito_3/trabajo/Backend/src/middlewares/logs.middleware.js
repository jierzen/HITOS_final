const moment = require('moment')

const handleRequestLogs = (req, res, next) => {
  const time = moment().format('DD/MM/YY HH:mm:ss')
  const {method, originalUrl} = req
  const path = originalUrl.split('?')[0]
  
  const message = `
  *****
  [${time}] Se ha realizado una consulta '${method} ${path}'
  *****
  `
  
  console.log(message)
  next()
}

module.exports = {
  handleRequestLogs
}