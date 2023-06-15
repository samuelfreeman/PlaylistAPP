const express = require('express');
const router = express.Router();

const authors = require('../controllers/authors');


router.post('/author', authors.create);

router.get('/authors', authors.getall);

router.get('/author/:id', authors.getSingle);

router.delete('/author/:id', authors.remove);

router.patch('/author/:id', authors.patch);

module.exports = router;
