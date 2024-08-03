const express = require('express');
const router = express.Router();
const comentsControllers = require('../controllers/comentsControllers');
const { body } = require('express-validator');

router.get('/api/comentarios', comentsControllers.getAllComents)

router.post('/comentarios', [
        body('title').notEmpty(),
        body('coment').notEmpty(),
        body('userId').notEmpty(),
    ], 
    comentsControllers.createComent);


module.exports = router;