const express = require('express');
const {login, logout, me} = require('../controllers/Auth');

const router = express.Router();

router.get('/me', me);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;