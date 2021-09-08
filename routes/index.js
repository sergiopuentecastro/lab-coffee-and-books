module.exports = app => {
  app.use('/', require('./base.routes.js')),
  app.use('/places', require('./place.routes.js'))
  app.use('/', require('./map.routes'))
  app.use('/api', require('./api.routes'))
}
