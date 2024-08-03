const comentsService = require('../services/comentsService');
require('dotenv').config();

const getAllComents = async (req, res) => {
    try {
        const coments = await comentsService.getAllComents();
        res.json(coments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createComent = async (req, res) => {
    try {
        const { title, coment, userId } = req.body;
        await comentsService.createComent(title, coment, userId);
        res.redirect('/foro');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllComents,
    createComent
}