var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Keyboard page. */
router.get('/keyboard', function(req, res, next) {
  res.render('keyboard', { title: 'Express' });
});

/* GET Clock page. */
router.get('/clock', function(req, res, next) {
  res.render('clock', { title: 'Express' });
});

module.exports = router;
