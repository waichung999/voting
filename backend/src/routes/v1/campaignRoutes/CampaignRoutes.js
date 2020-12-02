const appRoot = require('app-root-path') + '/src/';
const router = require('express').Router();
const CampaignController = require('./CampaignController');
const RouteConstant = require(appRoot+'constant/Routes');
const Middleware = require(appRoot+'cors/middleware');

module.exports = (app) => {
  router.route('/')
  .get(
    CampaignController.getAll
  );
  router.route('/:id')
  .get(
    Middleware.checkToken,
    CampaignController.getById
  );
  router.route('/:id/result')
  .get(
    Middleware.checkToken,
    CampaignController.getResultById
  );
  app.use(
    RouteConstant.V1.CAMPAIGN,
    router
  );
}
