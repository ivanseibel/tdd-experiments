const routes = require('express').Router();
const { User } = require('./app/models/');
const authMiddleware = require('./app/middlewares/auth');

const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;