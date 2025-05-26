const BaseRepo = require('../services/BaseRepository');
const { DownloadModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try {
    const data = await BaseRepo.baseCreate(DownloadModel, payload);
    if(!data){
        return res.status(400).json({error: 'Error creating Downloads'});
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
    const data = await BaseRepo.baseList(DownloadModel, params);
    if(!data){
        return res.status(400).json({error: 'Error fetching Downloads'});
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
    const data = await BaseRepo.baseUpdate(DownloadModel, {id}, payload);
    if(!data){
        return res.status(400).json({error: 'Error updating Downloads'});
    }
    res.status(201).json({
        message: 'Downloads updated successfully',
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
    const data = await BaseRepo.baseDelete(DownloadModel, {id});
    if(!data){
        return res.status(400).json({error: 'Error deleting Downloads'});
    }
    res.status(201).json({
        message: 'Downloads deleted successfully',
        data: data
    });
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
    }
}