const express = require('express');
const router = express.Router();

router.get('/Browse', (req, res) => res.render('Browse.ejs'));

module.exports = router;