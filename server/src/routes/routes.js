const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/jwt');
const dataController = require('../controllers/dataController');
const greetingController = require('../controllers/greetingController');

router.get('/get-username', verifyJWT, dataController.getUsername);
router.post('/update-user', verifyJWT, dataController.updateUser);
router.get('/get-greetings', verifyJWT, greetingController.getGreetings);
router.post('/set-greeting', verifyJWT, greetingController.setGreeting);
router.put('/update-greeting', verifyJWT, greetingController.updateGreeting);
router.post('/delete-greeting', verifyJWT, greetingController.deleteGreeting);

module.exports = router;
