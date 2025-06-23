const BaseRepo = require('../services/BaseRepository');
const { MSMEBusinessModel, DirectorsInfoModel,ServiceProvidersModel } = require('../models');
const { validationResult } = require('express-validator');

module.exports.getDashboardData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseCount(MSMEBusinessModel,{});
    const totalMSMEApproved = await BaseRepo.baseCount(MSMEBusinessModel, { is_verified: 2 });
    const totalMSMERejected = await BaseRepo.baseCount(MSMEBusinessModel, {is_verified: 3 });
    const totalMSMEPending = await BaseRepo.baseCount(MSMEBusinessModel, { is_verified: 1 });

    console.log(totalMSME, totalMSMEApproved, totalMSMERejected, totalMSMEPending);

    res.status(201).json({
      message: 'Dashboard data fetched successfully',
      data: {
        totalMSME,
        totalMSMEApproved,
        totalMSMERejected,
        totalMSMEPending
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports.getMSMETotalData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseCount(MSMEBusinessModel,{});
    const totalMSMEApproved = await BaseRepo.baseCount(MSMEBusinessModel, { is_verified: 2 });
    const totalMSMERejected = await BaseRepo.baseCount(MSMEBusinessModel, {is_verified: 3 });
    const totalMSMEPending = await BaseRepo.baseCount(MSMEBusinessModel, { is_verified: 1 });
    const totalOwnerFemale = await BaseRepo.baseCount(MSMEBusinessModel, { ownerType: "Female" });
    const totalOwnerMale = await BaseRepo.baseCount(MSMEBusinessModel, { ownerType: "Male" });
    const totalDisabilityOwned = await BaseRepo.baseCount(MSMEBusinessModel, { disability_owned: "Yes" });

    const totalMSMERagistered = await BaseRepo.baseCount(MSMEBusinessModel, { business_type: "Registered" });
    const totalMSMEUnragistered = await BaseRepo.baseCount(MSMEBusinessModel, { business_type: "Unregistered" });
    

    console.log(totalMSME, totalMSMEApproved, totalMSMERejected, 
      totalMSMEPending,totalOwnerFemale, totalOwnerMale, totalDisabilityOwned,
      totalMSMERagistered, totalMSMEUnragistered
    );

    res.status(201).json({
      message: 'Dashboard MSME Total data fetched successfully',
      data: {
        totalMSME,
        totalMSMEApproved,
        totalMSMERejected,
        totalMSMEPending,
        totalOwnerFemale,
        totalOwnerMale,
        totalDisabilityOwned,
        totalMSMERagistered,
        totalMSMEUnragistered
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getMSMEDirectorsInfoData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalDirectors = await BaseRepo.baseCount(DirectorsInfoModel,{});
    const totalMaleDirectors = await BaseRepo.baseCount(DirectorsInfoModel, { gender: "Male" });
    const totalFemaleDirectors = await BaseRepo.baseCount(DirectorsInfoModel, {gender: "Female" });
    const total18YearsOldDirectors = await BaseRepo.baseCount(DirectorsInfoModel, { age: "18-25" });
    const total25YearsOldDirectors = await BaseRepo.baseCount(DirectorsInfoModel, { age: "25-40" });
    const total40YearsOldDirectors = await BaseRepo.baseCount(DirectorsInfoModel, { age: "40+" });
    
    console.log(totalDirectors, totalMaleDirectors, totalFemaleDirectors, 
      total18YearsOldDirectors,total25YearsOldDirectors, total40YearsOldDirectors);

    res.status(201).json({
      message: 'Dashboard MSME Directors data fetched successfully',
      data: {
        totalDirectors,
        totalMaleDirectors,
        totalFemaleDirectors,
        total18YearsOldDirectors,
        total25YearsOldDirectors,
        total40YearsOldDirectors
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}





module.exports.getDashboardMSMERequestsData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardAlarts(MSMEBusinessModel, year);

    res.status(201).json({
      message: 'Dashboard MSME Requests Recived Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardAccordingToTurnoverData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseCount(MSMEBusinessModel,{});
    const totalMSMESmall = await BaseRepo.baseCount(MSMEBusinessModel, { turnover: "small" });
    const totalMSMEMicro = await BaseRepo.baseCount(MSMEBusinessModel, {turnover: "micro" });
    const totalMSMEMedium = await BaseRepo.baseCount(MSMEBusinessModel, { turnover: "medium" });

    console.log(totalMSME, totalMSMESmall, totalMSMEMicro, totalMSMEMedium);

    res.status(201).json({
      message: 'Dashboard MSME Turnover data fetched successfully',
      data: {
        totalMSME,
        totalMSMESmall,
        totalMSMEMicro,
        totalMSMEMedium
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getDashboardMSMERegionWiseData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const year = req.params.year;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getDashboardUserRigionWise(MSMEBusinessModel, year);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports.getDashboardMSMEListAccordingToCategoryData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getMSMEDataAccordingToCategory(MSMEBusinessModel);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports.getDashboardServiceProviderListAccordingToCategoryData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const alarts = await BaseRepo.getServiceProviderDataAccordingToCategory(ServiceProvidersModel);

    res.status(201).json({
      message: 'Dashboard User Data fetched successfully',
      data: alarts
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
