const BaseRepo = require('../services/BaseRepository');
const { MSMEBusinessModel, DirectorsInfoModel,ServiceProvidersModel,BusinessCategoriesModel } = require('../models');
const { validationResult } = require('express-validator');

module.exports.getDashboardData = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel,"deletedAt",null, year);
    const totalMSMEApproved = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "is_verified", "2" ,year);
    const totalMSMERejected = BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "3" , year);
    const totalMSMEPending = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "1", year);

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
  const year = req.params.year;

  console.log("Year:", year);

  const params = {
    searchParams: {},
  }
  try {
    const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel,"deletedAt",null, year);
    const totalMSMEApproved = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "is_verified", "2" ,year);
    const totalMSMERejected = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "3" , year);
    const totalMSMEPending = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "is_verified", "1", year);
    const totalOwnerFemale = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "ownerType", "Female" , year);
    const totalOwnerMale = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "ownerType", "Male" , year);
    const totalDisabilityOwned = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "disability_owned", "Yes", year);

    const totalMSMERagistered = await BaseRepo.baseDashboardCount(MSMEBusinessModel,  "business_type", "Registered" , year);
    const totalMSMEUnragistered = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "business_type", "Unregistered", year);
    
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
    const totalDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,"deletedAt", null, year);
    const totalMaleDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "gender", "Male", year);
    const totalFemaleDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel, "gender", "Female", year);
    const totalOtherDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel, "gender", "Other" , year);
    const total18YearsOldDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "age", "18-25" , year);
    const total25YearsOldDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "age", "25-40", year);
    const total40YearsOldDirectors = await BaseRepo.baseDashboardCount(DirectorsInfoModel,  "age", "40+" , year);
    
    console.log(totalDirectors, totalMaleDirectors, totalFemaleDirectors, 
      total18YearsOldDirectors,total25YearsOldDirectors, total40YearsOldDirectors);

    res.status(201).json({
      message: 'Dashboard MSME Directors data fetched successfully',
      data: {
        totalDirectors,
        totalMaleDirectors,
        totalFemaleDirectors,
        totalOtherDirectors,
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
      message: 'Dashboard MSME Requests Received Data fetched successfully',
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
    const totalMSME = await BaseRepo.baseDashboardCount(MSMEBusinessModel,"deletedAt",null, year);
    const totalMSMESmall = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "turnover", "small", year);
    const totalMSMEMicro = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "turnover", "micro" , year);
    const totalMSMEMedium = await BaseRepo.baseDashboardCount(MSMEBusinessModel, "turnover", "medium" , year);

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
    const alarts = await BaseRepo.getMSMEDataAccordingToCategory(MSMEBusinessModel,BusinessCategoriesModel);

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
