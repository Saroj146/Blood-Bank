const express = require('express');
const debug = require('debug')('app:hospitalRoutes');
const http = require('../util/httpStatus');

const hospitalRouter = express.Router();

function router(nav) {
  hospitalRouter.route('/list')
    .get((req, res) => {
      res.status(http.OK).json('Hospitals list');
    });

  hospitalRouter.route('/:id')
    .get((req, res) => {
      res.status(http.OK).json(req.params.id);
    });

  hospitalRouter.route('/register')
    .post((req, res) => {
      res.status(http.CREATED).json('Created Successfully');
    });

  hospitalRouter.route('/:id')
    .put((req, res) => {
      res.status(http.OK).json('Edited Successfully');
    });

  hospitalRouter.route('/:id')
    .delete((req, res) => {
      res.status(http.OK).json('Deleted Successfully');
    });
  return hospitalRouter;
}

module.exports = router;
