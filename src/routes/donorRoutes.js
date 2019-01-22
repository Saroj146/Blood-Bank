const express = require('express');
const debug = require('debug')('app:donorRoutes');
const http = require('../util/httpStatus');

const donorRouter = express.Router();

donorRouter.get('/list', (req, res) => {
  res.status(http.OK).send('Donors list');
});

donorRouter.get('/:id', (req, res) => {
  res.status(http.OK).send('Donor Details');
});

donorRouter.post('/register', (req, res) => {
  res.status(http.CREATED).send('Registered Successfully');
});

donorRouter.put('/:id', (req, res) => {
  res.status(http.OK).send('Edited Successfully');
});

donorRouter.delete('/:id', (req, res) => {
  res.status(http.OK).send({ id: req.params.id, message: ' deleted successfully' });
});

module.exports = donorRouter;
