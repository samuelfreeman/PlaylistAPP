const express = require("express");
const router = express.Router();
const albums = require("../controllers/albums");

router.post("/album", albums.post);
router.get("/album/:id", albums.getsingle);
router.get("/albums", albums.getAll);
router.get("/albums/:authorId", albums.getSingleAlbumId);
router.get("/albums/:id/author/:authorId", albums.getAlbumAuthor2);
router.get("/album/:id", albums.patch);
router.delete("/album/:id", albums.remove);
module.exports = router;
