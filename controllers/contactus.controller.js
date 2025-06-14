const BaseRepo = require('../services/BaseRepository');
const { ContactUsModel } = require('../models');
const {validationResult} = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const payload = req.body;

    try{
    const feedback = await BaseRepo.baseCreate(ContactUsModel, payload);
    if(!feedback){
        return res.status(400).json({error: 'Error creating Contact Us'});
    }
    res.status(201).json(feedback);
}
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'internal server error'});
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
  try{
    const feedback = await BaseRepo.baseList(ContactUsModel, params);
    if(!feedback){
        return res.status(400).json({error: 'Error fetching Contact Us'});
    }
    res.status(201).json(feedback);
}
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'internal server error'});
    }
}
