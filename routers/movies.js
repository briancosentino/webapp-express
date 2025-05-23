const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/moviesControllers')
router.get('/', moviesController.index)
router.get('/:id', moviesController.show)
router.post('/', moviesController.store)

module.exports = router