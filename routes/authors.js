const express = require('express');
const router = express.Router();

const authors = require('../controllers/authors');


router.post('/', authors.create);

router.get('/', authors.getall);

router.get('/:id', authors.getSingle);

router.delete('/:id', authors.remove);

router.patch('/:id', authors.patch);

module.exports = router;
