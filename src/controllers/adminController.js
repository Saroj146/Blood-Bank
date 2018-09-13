const debug = require('debug')('app:adminController');

const Province = require('../models/province');
const District = require('../models/district');
const Municipality = require('../models/municipality');
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
 *                    DISTRICT CRUD OPERATION
 * ===============================================================
 */

// method to get district list
exports.districtList = function districtList(req, res, next) {
  debug(req.query);
  District.find(req.query, '_id name p_id').exec((err, districts) => {
    if (err) { return next(err); }
    res.status(http.OK).send(districts);
    return districts;
  });
};

// method to get district detail
exports.districtDetail = function districtList(req, res, next) {
  District.findById({ _id: req.params.id }, '_id name p_id').exec((err, district) => {
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
    p_id: req.body.p_id
  });
  District.findOne({ name: req.body.name }).exec((err, data) => {
    if (err) { return next(err); }
    if (data) {
      res.status(http.BADREQUEST).send({ status: 'error', message: `district with name ${req.body.name} already exists` });
    } else {
      Province.findOne({ _id: req.body.p_id }).exec((pErr, pData) => {
        if (pErr) { return next(pErr); }
        if (!pData) {
          res.status(http.BADREQUEST).send({ status: 'error', message: `province with id ${req.body.p_id} not found` });
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
        return pData;
      });
    }
    return data;
  });
};

// method to update district
exports.updateDistrict = function updateDistrict(req, res, next) {
  debug(req.body);
  Province.findOne({ _id: req.body.p_id }).exec((pErr, province) => {
    if (province) {
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
      res.status(http.BADREQUEST).send({ status: 'error', message: 'province doesnot exists' });
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

/**
 * ===============================================================
 *                    MUNICIPALITY CRUD OPERATION
 * ===============================================================
 */

// method to get municipality list
exports.municipalityList = function municipalityList(req, res, next) {
  Municipality.find(req.query, '_id name d_id').exec((err, municipality) => {
    if (err) { return next(err); }
    res.status(http.OK).send(municipality);
    return municipality;
  });
};

// method to get municipality detail
exports.municipalityDetail = function municipalityList(req, res, next) {
  Municipality.findById({ _id: req.params.id }, '_id name d_id').exec((err, municipality) => {
    if (err) {
      res.status(400).send({ status: 'error', name: 'ID Validation error', message: 'Invalid ID' });
      return next(err);
    }
    if (!municipality) {
      res.status(http.NOTFOUND).send({ message: 'municipality not found' });
    } else {
      res.status(http.OK).send(municipality);
    }
    return municipality;
  });
};

// method to register municipality
exports.createMunicipality = function createMunicipality(req, res, next) {
  const municipality = new Municipality({
    name: req.body.name,
    d_id: req.body.d_id
  });
  Municipality.findOne({ name: req.body.name }).exec((err, data) => {
    if (err) { return next(err); }
    if (data) {
      res.status(http.BADREQUEST).send({ status: 'error', message: `municipality with name ${req.body.name} already exists` });
    } else {
      District.findOne({ _id: req.body.d_id }).exec((dErr, dData) => {
        if (dErr) { return next(dErr); }
        if (!dData) {
          res.status(http.BADREQUEST).send({ status: 'error', message: `district with id ${req.body.d_id} not found` });
        } else {
          municipality.save((mErr, mData) => {
            if (mErr) {
              res.status(http.BADREQUEST).send({ status: 'error', name: mErr.name, message: mErr.message });
              return next(dErr);
            }
            res.status(http.CREATED).send({ status: 'success', message: 'Created Successfully', id: municipality._id });
            return mData;
          });
        }
        return dData;
      });
    }
    return data;
  });
};

// method to update municipality
exports.updateMunicipality = function updateMunicipality(req, res, next) {
  debug(req.body);
  District.findOne({ _id: req.body.d_id }).exec((dErr, district) => {
    if (district) {
      Municipality.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, municipality) => {
        if (err) { return next(err); }
        if (municipality != null) {
          res.status(http.OK).send({ status: 'success', message: 'Successfully Updated', id: req.params.id });
        } else {
          res.status(http.NOTFOUND).send({ status: 'error', message: `municipality with id ${req.params.id} not found` });
        }
        return null;
      });
    } else {
      res.status(http.BADREQUEST).send({ status: 'error', message: 'district doesnot exists' });
    }
  });
};

// method to delete municipality
exports.deleteMunicipality = function deleteMunicipality(req, res, next) {
  Municipality.deleteOne({ _id: req.params.id }, (err, municipality) => {
    debug(municipality);
    if (err) {
      res.status(http.BADREQUEST).send(err);
      return next(err);
    }
    if (municipality.n === 0) {
      res.status(http.NOTFOUND).send({ status: 'error', message: `municipality with id ${req.params.id} not found` });
      return municipality;
    }
    res.status(http.OK).send({ status: 'success', message: `${req.params.id} deleted successfully` });
    return null;
  });
};
