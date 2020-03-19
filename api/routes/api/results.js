const router = require('express').Router()
const results = require('@controllers/api/results')

router.get('/', results.get)

router.post('/', results.add)

router.put('/:id', results.edit)

router.delete('/:id', results.deleteRecord)

module.exports = router
