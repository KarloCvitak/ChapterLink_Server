const express = require('express');
const { Status, Book, UserBook } = require('../models');
const verifyToken = require("../middlewares/verifyToken"); // Assuming models are defined and exported from '../models'



module.exports = () => {

    const statusRouter = express.Router();
    statusRouter.use(verifyToken);


    statusRouter.get('/', async (req, res) => {
        try {
            const statuses = await Status.findAll();
            res.json({status: 'OK', statuses});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });


    statusRouter.get('/:status_id/books', async (req, res) => {
        try {
            const {status_id} = req.params;
            const books = await UserBook.findAll({
                where: {status_id},
                include: [{model: Book}]
            });
            res.json({status: 'OK', books});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });


    return statusRouter;
};
