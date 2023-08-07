const express = require('express');

const router = express.Router();

const productionRoutes = require('./production');

productionRoutes(router);  /*production Routes*/

module.exports = router;
