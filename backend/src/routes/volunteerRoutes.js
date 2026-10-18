const express = require('express');
const router = express.Router();
const VolunteerController = require('../controllers/volunteerController');

router.get('/', VolunteerController.getAll);
router.post('/', VolunteerController.create);
router.put('/:id', VolunteerController.update);
router.delete('/:id', VolunteerController.remove);

module.exports = router;
