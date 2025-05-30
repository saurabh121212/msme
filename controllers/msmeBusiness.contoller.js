const BaseRepo = require('../services/BaseRepository');
const { MSMEBusinessModel, DirectorsInfoModel } = require('../models');
const { validationResult } = require('express-validator');


module.exports.add = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { directorsInfo, ...msmeData } = req.body;
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
        searchParams: {business_category_id: business_category_id},
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

        console.log("msmeDetails ==> ", msmeDetails.dataValues.id);
        
        const directorsDetail = await BaseRepo.baseFindAllById(DirectorsInfoModel, msmeDetails.dataValues.id, "business_id");
        if (!directorsDetail) {
            return res.status(400).json({ error: 'Error fetching directors details' });
        }
        res.status(201).json({msmeDetails, directorsDetail});
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

    const payload = req.body;
    const id = req.params.id;

    try {
        const BusinessCategories = await BaseRepo.baseUpdate(MSMEBusinessModel, { id }, payload);
        if (!BusinessCategories) {
            return res.status(400).json({ error: 'Error updating Business Categories' });
        }
        res.status(201).json({
            message: 'Business Categories updated successfully',
            data: BusinessCategories
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