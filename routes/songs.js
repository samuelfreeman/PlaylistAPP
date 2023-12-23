const express = require("express");

const router = express.Router();

const songs = require("../controllers/songs");

router.post("/", songs.post);

router.get("/:id", songs.getSingle);

router.get("/", songs.getAll);

router.get("/:albumId", songs.getSingleAlbumId);

router.get("/:id/album/:albumId", songs.getSongAlbum2);

router.patch("/:id", songs.patch);

router.delete("/:id", songs.remove);

module.exports = router;
