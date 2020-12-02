const appRoot = require('app-root-path') + '/src/';
const router = require('express').Router();
const UserVoteController = require('./UserVoteController');
const RouteConstant = require(appRoot + 'constant/Routes');
const Middleware = require(appRoot + 'cors/middleware');

module.exports = (app) => {
  router.route('/vote')
  .post(
    Middleware.checkToken,
    UserVoteController.vote
  );
  router.route('/verification')
  .post(
    UserVoteController.verification
  );
  router.route('/voteRecord')
  .get(
    Middleware.checkToken,
    UserVoteController.getVoteRecord
  );
  app.use(
    RouteConstant.V1.USER,
    router
  );
}
