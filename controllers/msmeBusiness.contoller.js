const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
const BaseRepo = require('../services/BaseRepository');
const { MSMEBusinessModel, DirectorsInfoModel } = require('../models');
const { validationResult } = require('express-validator');
const sendEmail = require('../mailer/mailerFile');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { directorsInfo, ...msmeData } = req.body;

    // console.log("msmeData ==> ", msmeData);

    const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: msmeData.email_address } });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ID already exists' });
    }

    const hashedPassword = await MSMEBusinessModel.hashPassword(msmeData.password.toString());
    msmeData.password = hashedPassword;

    try {
        const msme = await BaseRepo.baseCreate(MSMEBusinessModel, msmeData);
        if (!msme) {
            return res.status(400).json({ error: 'Error creating MSME Business' });
        }

        const directors = directorsInfo.map(director => ({
            ...director,
            business_id: msme.id
        }));

        const directorsInfoValues = await BaseRepo.baseBulkCreate(DirectorsInfoModel, directors);
        if (!directorsInfoValues) {
            return res.status(400).json({ error: 'Error creating MSME Business' });
        }

        // Send email to the user
        sendEmail(msmeData, 1, msmeData.email_address);

        res.status(201).json(
            {
                message: "MSME and directors saved successfully",
                data: {
                    msme: msme,
                    directors: directorsInfoValues
                }
            });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.get = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const params = {
        searchParams: { is_verified: 2 },
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.getWeb = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const params = {
        searchParams: {},
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports.getListAccordingToCategoryId = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const business_category_id = req.params.business_category_id;

    const params = {
        searchParams: {
            is_verified: 2,
            business_category_id: business_category_id
         },
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }

    console.log("params inside ==> ", params);
    console.log("params.searchParams ==> ", params.searchParams);

    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.getMSMEDetails = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const id = req.params.id;

    // const params = {
    //     searchParams: {id: id},
    //     limit: limit,
    //     offset: offset,
    //     page: page,
    //     order: [["id", "DESC"]],
    // }
    try {
        const msmeDetails = await BaseRepo.baseFindById(MSMEBusinessModel, id, "id");
        if (!msmeDetails) {
            return res.status(400).json({ error: 'Error fetching MSME details' });
        }

        // console.log("msmeDetails ==> ", msmeDetails.dataValues.id);

        const directorsDetail = await BaseRepo.baseFindAllById(DirectorsInfoModel, msmeDetails.dataValues.id, "business_id");
        if (!directorsDetail) {
            return res.status(400).json({ error: 'Error fetching directors details' });
        }
        res.status(201).json({ msmeDetails, directorsDetail });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.update = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { directorsInfo, ...msmeData } = req.body;
    const id = req.params.id;

    try {
        const MSMEBusiness = await BaseRepo.baseUpdate(MSMEBusinessModel, { id }, msmeData);
        if (!MSMEBusiness) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        //    const directorsInfo = await BaseRepo.baseUpdate(MSMEBusinessModel, { business_id:id }, directorsInfo);
        //     if (!directorsInfo) {
        //         return res.status(400).json({ error: 'Error updating directors info' });
        //     }

        res.status(201).json({
            message: 'MSME Business updated successfully',
            data: MSMEBusiness
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {
        const BusinessCategories = await BaseRepo.baseDelete(MSMEBusinessModel, { id });
        if (!BusinessCategories) {
            return res.status(400).json({ error: 'Error deleting Business Categories' });
        }
        res.status(201).json({
            message: 'Business Categories deleted successfully',
            data: BusinessCategories
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.verifyMSME = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const payload = req.body;
    const id = req.params.id;

    try {
        const Business = await BaseRepo.baseUpdate(MSMEBusinessModel, { id }, payload);
        if (!Business) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        // Send email to the user
        sendEmail("", payload.is_verified, payload.email_address);

        res.status(201).json({
            message: 'MSME Business updated successfully',
            data: Business
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.searchByName = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const name_of_organization = req.params.name_of_organization;

    // console.log("name_of_organization ==> ", name_of_organization);

    try {
        const msmeInfo = await BaseRepo.getSearchByLocation(MSMEBusinessModel, name_of_organization);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching Business Categories' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.searchByRegion = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const region = req.params.region;

    const params = {
        searchParams: { region: region },
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching MSME Business' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.filtersAPI = async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const filters = {
        business_category_id: req.query.business_category_id,
        region: req.query.region,
        disability_owned: req.query.disability_owned,
        turnover: req.query.turnover,
        ownerType: req.query.ownerType,
        business_type: req.query.business_type,
    };

    const searchParams = {};



    if (filters.business_category_id && filters.business_category_id !== 'All') {
        searchParams.business_category_id = filters.business_category_id;
    }

    if (filters.region && filters.region !== 'All') {
        searchParams.region = filters.region;
    }

    if (filters.disability_owned === 'Yes') {
        searchParams.disability_owned = "Yes";
    } else if (filters.disability_owned === 'No') {
        searchParams.disability_owned = "No";
    }


    if (filters.business_type === 'Registered') {
        searchParams.business_type = "Registered";
    } else if (filters.business_type === 'Unregistered') {
        searchParams.business_type = "Unregistered";
    }


    if (filters.turnover) {
        searchParams.turnover = {
            [Op.lte]: filters.turnover
        };
    }

    if (filters.ownerType && filters.ownerType !== 'All') {
        searchParams.ownerType = filters.ownerType;
    }

    // if (filters.businessType === 'Registered') {
    //     searchParams.isRegistered = "Registered";
    // } else if (filters.businessType === 'Unregistered') {
    //     searchParams.isRegistered = "Unregistered";
    // }


    const params = {
        searchParams,
        limit: limit,
        offset: offset,
        page: page,
        order: [["id", "DESC"]],
    }
    try {
        const msmeInfo = await BaseRepo.baseList(MSMEBusinessModel, params);
        if (!msmeInfo) {
            return res.status(400).json({ error: 'Error fetching MSME Business' });
        }
        res.status(201).json(msmeInfo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email_address, password } = req.body;

    const user = await MSMEBusinessModel.findOne({ where: { email_address } });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password 1' });
    }

    // console.log("user 1",user);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password 2' });
    }
    const token = await user.generateAuthToken(); // ✅ instance method
    res.status(200).json({ user, token });

};



module.exports.forgetPasswordSendEmail = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let payload;
    const email_address = req.params.email_address;

    const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: email_address } });
    if (!isEmailExist) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60000); // 10 minutes from now

    payload = { otp: otp, otp_expiry: otp_expiry };

    try {
        const Business = await BaseRepo.baseUpdate(MSMEBusinessModel, { email_address }, payload);
        if (!Business) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        // Send email to the user
        sendEmail(payload, 4, email_address);

        res.status(201).json({
            message: 'OTP sent successfully',
            data: Business
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.forgetPasswordVerifyOTP = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let payload;
    const email_address = req.params.email_address;
    const otp = req.params.otp;

    try {
    const record = await MSMEBusinessModel.findOne({ where: { email_address: email_address, otp: otp } });
    if (!record || record.otp_expiry < new Date()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }
        res.status(201).json({
            message: 'OTP verified successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.forgetPassword = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let payload;
    const email_address = req.params.email_address;
    const password = req.params.password;

    console.log("email_address ==> ", email_address);
    console.log("password ==> ", password);

    const isEmailExist = await MSMEBusinessModel.findOne({ where: { email_address: email_address } });
    if (!isEmailExist) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const hashedPassword = await MSMEBusinessModel.hashPassword(password.toString());

    payload = { password: hashedPassword, otp: null, otp_expiry: null };

    try {
        const Business = await BaseRepo.baseUpdate(MSMEBusinessModel, { email_address }, payload);
        if (!Business) {
            return res.status(400).json({ error: 'Error updating MSME Business' });
        }

        res.status(201).json({
            message: 'Reset password successfully',
            data: Business
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}