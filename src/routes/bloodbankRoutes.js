const express = require('express');
const debug = require('debug')('app:bloodbankRoutes');
const http = require('../util/httpStatus');

const bloodbankRouter = express.Router();

function router(nav) {
  bloodbankRouter.get('/list', (req, res) => {
    res.status(http.OK).send('Bloodbanks list');
  });

  bloodbankRouter.get('/:id', (req, res) => {
    res.status(http.OK).send(req.params.id);
  });

  bloodbankRouter.post('/register', (req, res) => {
    res.status(http.CREATED).send('Successfully Registered');
  });

  bloodbankRouter.put('/:id', (req, res) => {
    res.status(http.OK).send('Successfully Edited');
  });

  bloodbankRouter.delete('/:id', (req, res) => {
    res.status(http.OK).send('Successfully Deleted');
  });
  return bloodbankRouter;
}

module.exports = router;
