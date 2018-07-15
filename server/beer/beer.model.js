const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


const BeerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  craetedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

BeerSchema.statics = {
    /**
     *
     * @param {Object} id
     * @returns {Promise< Beer, APIError>}
     */
  get(id) {
    return this.findById(id)
        .exec()
        .then((beer) => {
          if (beer) {
            return beer;
          }
          const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
  },
    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
        .sort({ craetedAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
  }
};

module.exports = mongoose.model('Beer', BeerSchema);
