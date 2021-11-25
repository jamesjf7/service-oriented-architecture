/** library */
const express = require("express");

/** model */
const usersModel = require('../models/users')

const router = express.Router()

/** routes */
router.post('/', async (req, res) => {
    let nama = req.body.nama
    let result = await usersModel.addNew(nama)
    return res.status(200).send(result.message)
});

router.get('/', async (req, res) => {
    // get API key yang ditaruh di header 
    let key = req.header('x-auth-token')
    let result = await usersModel.getAll(key)
    return res.status(200).json(result.message)
});

module.exports = router;