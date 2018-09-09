const debug = require('debug')('app:adminController');

const Province = require('../models/province');
const Zone = require('../models/zone');
const District = require('../models/district');
const http = require('../util/httpStatus');

/**
 * ===============================================================
 *                    PROVINCE CRUD OPERATION
 * ===============================================================
 */

// method to get province list
exports.provinceList = function provinceList(req, res, next) {
  Province.find({}, '_id name number').exec((err, provinces) => {
    if (err) { return next(err); }
    res.status(http.OK).send(provinces);
    return provinces;
  });
};

// method to get province detail
exports.provinceDetail = function provinceList(req, res, next) {
  Province.findById({ _id: req.params.id }, '_id name number').exec((err, province) => {
    if (err) {
      res.status(400).send({ status: 'error', name: 'ID Validation error', message: 'Invalid ID' });
      return next(err);
    }
    if (!province) {
      res.status(http.NOTFOUND).send({ message: 'Province not found' });
    } else {
      res.status(http.OK).send(province);
    }
    return province;
  });
};

// method to register province
exports.createProvince = function createProvince(req, res, next) {
  debug(req.body);
  const province = new Province({
    name: req.body.name,
    number: req.body.number
  });
  province.save((err) => {
    if (err) {
      res.status(http.BADREQUEST).send({ name: err.name, message: err.message });
      return next(err);
    }
    res.status(http.CREATED).send({ status: 'success', message: 'Created Successfully', id: province._id });
    return province;
  });
};

// method to update province
exports.updateProvince = function updateProvince(req, res, next) {
  Province.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, province) => {
    if (err) {
      res.status(http.BADREQUEST).send({ name: err.name, message: err.message });
      return next(err);
    }
    if (province == null) {
      res.status(http.NOTFOUND).send({ status: 'error', message: `${req.params.id} not found` });
    }
    res.status(http.OK).send({ status: 'success', message: 'Successfully Updated', id: req.params.id });
    return null;
  });
};

// method to delete province
exports.deleteProvince = function deleteProvince(req, res, next) {
  Province.deleteOne({ _id: req.params.id }, (err, province) => {
    debug(province);
    if (err) {
      res.status(http.BADREQUEST).send(err);
      return next(err);
    }
    if (province.n === 0) {
      res.status(http.NOTFOUND).send({ status: 'error', message: `${req.params.id} not found` });
      return province;
    }
    res.status(http.OK).send({ status: 'success', message: `${req.params.id} deleted successfully` });
    return null;
  });
};

/**
 * ===============================================================
 *                    ZONE CRUD OPERATION
 * ===============================================================
 */

// method to get zone list
exports.zoneList = function zoneList(req, res, next) {
  Zone.find({}, '_id name p_id').exec((err, zones) => {
    if (err) { return next(err); }
    res.status(http.OK).send(zones);
    return zones;
  });
};

// method to get zone detail
exports.zoneDetail = function zoneList(req, res, next) {
  Zone.findById({ _id: req.params.id }, '_id name p_id').exec((err, zone) => {
    if (err) {
      res.status(400).send({ status: 'error', name: 'ID Validation error', message: 'Invalid ID' });
      return next(err);
    }
    if (!zone) {
      res.status(http.NOTFOUND).send({ message: 'Zone not found' });
    } else {
      res.status(http.OK).send(zone);
    }
    return zone;
  });
};

// method to register zone
exports.createZone = function createZone(req, res, next) {
  const zone = new Zone({
    name: req.body.name,
    p_id: req.body.p_id
  });
  Zone.findOne({ name: req.body.name }).exec((err, data) => {
    if (err) { return next(err); }
    if (data) {
      res.status(http.BADREQUEST).send({ status: 'error', message: `zone with name ${req.body.name} already exists` });
    } else {
      Province.findOne({ _id: req.body.p_id }).exec((pErr, pData) => {
        if (pErr) { return next(pErr); }
        if (!pData) {
          res.status(http.BADREQUEST).send({ status: 'error', message: `province with id ${req.body.p_id} not found` });
        } else {
          zone.save((zErr, zData) => {
            if (zErr) {
              res.status(http.BADREQUEST).send({ status: 'error', name: zErr.name, message: zErr.message });
              return next(zErr);
            }
            res.status(http.CREATED).send({ status: 'success', message: 'Created Successfully', id: zone._id });
            return zData;
          });
        }
        return pData;
      });
    }
    return data;
  });
};

// method to update zone
exports.updateZone = function updateZone(req, res, next) {
  debug(req.body);
  Province.findOne({ _id: req.body.p_id }).exec((pErr, province) => {
    if (province) {
      Zone.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, zone) => {
        if (err) { return next(err); }
        if (zone != null) {
          res.status(http.OK).send({ status: 'success', message: 'Successfully Updated', id: req.params.id });
        } else {
          res.status(http.NOTFOUND).send({ status: 'error', message: `zone with id ${req.params.id} not found` });
        }
        return null;
      });
    } else {
      res.status(http.BADREQUEST).send({ status: 'error', message: 'Province doesnot exists' });
    }
  });
};

// method to delete zone
exports.deleteZone = function deleteZone(req, res, next) {
  Zone.deleteOne({ _id: req.params.id }, (err, zone) => {
    debug(zone);
    if (err) {
      res.status(http.BADREQUEST).send(err);
      return next(err);
    }
    if (zone.n === 0) {
      res.status(http.NOTFOUND).send({ status: 'error', message: `zone with id ${req.params.id} not found` });
      return zone;
    }
    res.status(http.OK).send({ status: 'success', message: `${req.params.id} deleted successfully` });
    return null;
  });
};

/**
 * ===============================================================
 *                    DISTRICT CRUD OPERATION
 * ===============================================================
 */

// method to get district list
exports.districtList = function districtList(req, res, next) {
  District.find({}, '_id name z_id').exec((err, districts) => {
    if (err) { return next(err); }
    res.status(http.OK).send(districts);
    return districts;
  });
};

// method to get district detail
exports.districtDetail = function districtList(req, res, next) {
  District.findById({ _id: req.params.id }, '_id name z_id').exec((err, district) => {
    if (err) {
      res.status(400).send({ status: 'error', name: 'ID Validation error', message: 'Invalid ID' });
      return next(err);
    }
    if (!district) {
      res.status(http.NOTFOUND).send({ message: 'district not found' });
    } else {
      res.status(http.OK).send(district);
    }
    return district;
  });
};

// method to register district
exports.createDistrict = function createDistrict(req, res, next) {
  const district = new District({
    name: req.body.name,
    z_id: req.body.z_id
  });
  District.findOne({ name: req.body.name }).exec((err, data) => {
    if (err) { return next(err); }
    if (data) {
      res.status(http.BADREQUEST).send({ status: 'error', message: `district with name ${req.body.name} already exists` });
    } else {
      Zone.findOne({ _id: req.body.z_id }).exec((zErr, zData) => {
        if (zErr) { return next(zErr); }
        if (!zData) {
          res.status(http.BADREQUEST).send({ status: 'error', message: `zone with id ${req.body.p_id} not found` });
        } else {
          district.save((dErr, dData) => {
            if (dErr) {
              res.status(http.BADREQUEST).send({ status: 'error', name: dErr.name, message: dErr.message });
              return next(dErr);
            }
            res.status(http.CREATED).send({ status: 'success', message: 'Created Successfully', id: district._id });
            return dData;
          });
        }
        return zData;
      });
    }
    return data;
  });
};

// method to update district
exports.updateDistrict = function updateDistrict(req, res, next) {
  debug(req.body);
  Zone.findOne({ _id: req.body.z_id }).exec((zErr, zone) => {
    if (zone) {
      District.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, district) => {
        if (err) { return next(err); }
        if (district != null) {
          res.status(http.OK).send({ status: 'success', message: 'Successfully Updated', id: req.params.id });
        } else {
          res.status(http.NOTFOUND).send({ status: 'error', message: `district with id ${req.params.id} not found` });
        }
        return null;
      });
    } else {
      res.status(http.BADREQUEST).send({ status: 'error', message: 'zone doesnot exists' });
    }
  });
};

// method to delete district
exports.deleteDistrict = function deleteDistrict(req, res, next) {
  District.deleteOne({ _id: req.params.id }, (err, district) => {
    debug(district);
    if (err) {
      res.status(http.BADREQUEST).send(err);
      return next(err);
    }
    if (district.n === 0) {
      res.status(http.NOTFOUND).send({ status: 'error', message: `district with id ${req.params.id} not found` });
      return district;
    }
    res.status(http.OK).send({ status: 'success', message: `${req.params.id} deleted successfully` });
    return null;
  });
};
