const express = require('express');

const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

/**
 * =====================================================================================
 *                              PROVINCES CRUD
 * =====================================================================================
 */

adminRouter.get('/provinces', adminController.provinceList);

adminRouter.get('/provinces/:id', adminController.provinceDetail);

adminRouter.post('/provinces/register', adminController.createProvince);

adminRouter.put('/provinces/:id', adminController.updateProvince);

adminRouter.delete('/provinces/:id', adminController.deleteProvince);

/**
 * =====================================================================================
 *                              ZONES CRUD
 * =====================================================================================
 */

adminRouter.get('/zones', adminController.zoneList);

adminRouter.get('/zones/:id', adminController.zoneDetail);

adminRouter.post('/zones/register', adminController.createZone);

adminRouter.put('/zones/:id', adminController.updateZone);

adminRouter.delete('/zones/:id', adminController.deleteZone);

/**
 * =====================================================================================
 *                              DISTRICTS CRUD
 * =====================================================================================
 */

adminRouter.get('/districts', adminController.districtList);

adminRouter.get('/districts/:id', adminController.districtDetail);

adminRouter.post('/districts/register', adminController.createDistrict);

adminRouter.put('/districts/:id', adminController.updateDistrict);

adminRouter.delete('/districts/:id', adminController.deleteDistrict);

/**
 * =====================================================================================
 *                              MUNICIPALITY CRUD
 * =====================================================================================
 */

module.exports = adminRouter;
