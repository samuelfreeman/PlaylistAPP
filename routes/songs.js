const express = require('express');
const router = express.Router();
const songs= require('../controllers/songs');

router.post("/songs",songs.post);
router.get("/song/:id",songs.getSingle);
router.get("/songs",songs.getAll);
router.get("/songs/:albumId",songs.getSingleAlbumId)

module.exports= router;