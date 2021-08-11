var express = require('express');
var router = express.Router();
const controller = require('../controller/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/chatroom',controller.fetchchatroom);
module.exports = router;
