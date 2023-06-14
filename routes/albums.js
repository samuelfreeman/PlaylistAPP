const express = require('express');
const router = express.Router();
const albums = require('../controllers/albums');

router.post("/album",albums.post)
router.get("/album/:id",albums.getsingle)
router.get("/albums",albums.getAll)

module.exports= router;