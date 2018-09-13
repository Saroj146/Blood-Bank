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

adminRouter.get('/municipalities', adminController.municipalityList);

adminRouter.get('/municipalities/:id', adminController.municipalityDetail);

adminRouter.post('/municipalities/register', adminController.createMunicipality);

adminRouter.put('/municipalities/:id', adminController.updateMunicipality);

adminRouter.delete('/municipalities/:id', adminController.deleteMunicipality);

module.exports = adminRouter;
