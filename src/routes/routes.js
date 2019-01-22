const router = require('express').Router();
const adminRouter = require('./adminRoutes');
const donorRouter = require('./donorRoutes');
const bloodbankRouter = require('./bloodbankRoutes');
const hospitalRouter = require('./hospitalRoutes');
const httpStatus = require('../util/httpStatus');

router.get('/', function(req, res){
  res.send({
    status: 'success',
    message: 'Welcome to BloodBank REST API!!!'
  });
});

router.use('/admin', adminRouter);
router.use('./donors', donorRouter);
router.use('./bloodbanks', bloodbankRouter);
router.use('./hospitals', hospitalRouter);

router.use(function(req, res){
  res.status(httpStatus.NOTFOUND).send('"' + req.url +'" NOT FOUND');
});

module.exports = router;
