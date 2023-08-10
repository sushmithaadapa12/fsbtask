const express = require('express');

const router = express.Router();

const productionRoutes = require('./production');

const userRoutes = require('./user');

productionRoutes(router);

userRoutes(router);

module.exports = router;
