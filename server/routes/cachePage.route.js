const express = require('express');
const cachePageRoute =  express.Router();
const controller = require('../controllers/cache.controller');

cachePageRoute.delete('/', controller.delete);

module.exports = cachePageRoute
