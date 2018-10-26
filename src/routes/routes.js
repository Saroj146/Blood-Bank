const router = require('express').Router();
const adminRouter = require('./adminRoutes');
const donorRouter = require('./donorRoutes');
const bloodbankRouter = require('./bloodbankRoutes');
const hospitalRouter = require('./hospitalRoutes');

router.get('/api', function(req, res){
  res.json({
    status: 'API working',
    message: 'Welcome to blood bank API!'
  });
});

router.use('/admin', adminRouter);
router.use('./donors', donorRouter);
router.use('./bloodbanks', bloodbankRouter);
router.use('./hospitals', hospitalRouter);

module.exports = router;
