const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const config = require('config');
const app = express();
const pack = require('../package');
const mode = process.env.NODE_ENV;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(require('express-status-monitor')());
const db = require('./models');

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

require('./routes')(app);

app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.get(`${mode}.port`), () => {
  console.log(chalk.yellow('.......................................')); //eslint-disable-line
  console.log(chalk.green(config.get(`${mode}.name`))); //eslint-disable-line
  console.log(chalk.green(`Port:\t\t${config.get(`${mode}.port`)}`)); //eslint-disable-line
  console.log(chalk.green(`Mode:\t\t${config.get(`${mode}.mode`)}`)); //eslint-disable-line
  console.log(chalk.green(`App version:\t${pack.version}`)); //eslint-disable-line
  console.log(chalk.yellow('.......................................')); //eslint-disable-line
})
module.exports = app
