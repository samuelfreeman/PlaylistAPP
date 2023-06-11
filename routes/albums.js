const express = require('express');
const router = express.Router();
const albums = require('../controllers/albums');

router.post("/albums",albums.post)


module.exports= router;