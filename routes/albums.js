const express = require("express");
const router = express.Router();
const albums = require("../controllers/albums");

router.post("/", albums.post);
router.get("/:id", albums.getsingle);
router.get("/", albums.getAll);
router.get("/:authorId", albums.getSingleAlbumId);
router.get("/:id/author/:authorId", albums.getAlbumAuthor2);
router.get("/:id", albums.patch);
router.delete("/:id", albums.remove);
module.exports = router;
