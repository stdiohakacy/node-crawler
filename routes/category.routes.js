const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/', async (req, res) => {
    const result = await categoryController.create(req.body);
    if(!result)
        return res.json({ isSuccess: false })
    return res.json(result);
})

router.get('/', async (req, res) => {
    const result = await categoryController.findAll();
    if(!result)
        return res.json({ isSuccess: false });
    return res.json(result);
})

module.exports = router;