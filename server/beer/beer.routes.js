const express = require('express');
const BeerCtr = require('./beer.controller');

const routes = express.Router(); // eslint-disable-line new-cap


routes.route('/')
.post(BeerCtr.create)
.get(BeerCtr.list);

routes.route('/beerId')
.get(BeerCtr.list)
.delete(BeerCtr.remove);
routes.param('beerId', BeerCtr.load);

module.exports = routes;
