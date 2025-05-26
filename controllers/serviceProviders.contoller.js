const BaseRepo = require('../services/BaseRepository');
const { ServiceProvidersModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const data = await BaseRepo.baseCreate(ServiceProvidersModel, payload);
    if(!data){
        return res.status(400).json({error: 'Error creating Service Providers'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.get = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const params = {
      searchParams: {},
      limit: limit,
      offset: offset,
      page: page,
      order:[["id","DESC"]],
  }
  try {
    const data = await BaseRepo.baseList(ServiceProvidersModel, params);
    if(!data){
        return res.status(400).json({error: 'Error fetching Service Providers'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;
    const id = req.params.id;

    try {
    const data = await BaseRepo.baseUpdate(ServiceProvidersModel, {id}, payload);
    if(!data){
        return res.status(400).json({error: 'Error updating Service Providers'});
    }
    res.status(201).json({
        message: 'Service Providers updated successfully',
        data: data
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {
    const data = await BaseRepo.baseDelete(ServiceProvidersModel, {id});
    if(!data){
        return res.status(400).json({error: 'Error deleting Service Providers'});
    }
    res.status(201).json({
        message: 'Service Providers deleted successfully',
        data: data
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports.getById = async (req, res, next) => {
    const categorie_id = req.params.categorie_id;
    try {
    const data = await BaseRepo.baseFindAllById(ServiceProvidersModel, categorie_id ,"categorie_id");
    if(!data){
        return res.status(400).json({error: 'Error fetching Service Providers'});
    }
    res.status(201).json(data);
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}