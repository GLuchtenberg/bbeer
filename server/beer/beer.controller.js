const Beer = require('./beer.model');

function load(req, res, next, id) {
  Beer.get(id)
    .then((beer) => {
      req.beer = beer;  // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.user);
}

function create(req, res, next) {
  const beer = new Beer({
    name: req.body.name,
    quantity: req.body.quantity,
    type: req.body.type
  });

  beer.save()
    .then(savedBeer => res.json(savedBeer))
    .catch(e => next(e));
}


function remove(req, res, next) {
  const beer = req.beer;
  beer.remove()
    .then(removedBeer => res.json(removedBeer))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { skip = 0, limit = 30 } = req.query;
  Beer.list({ skip, limit })
    .then(beers => res.json(beers))
    .catch(e => next(e));
}

module.exports = { load, get, create, remove, list };
