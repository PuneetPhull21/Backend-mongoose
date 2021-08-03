var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');
const verify  = require('../middleware/JWTverfiytoken,'); 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',controller.newuser);
router.get('/all',controller.fetchuser);
router.get('/:id',controller.fetchsingleuser);
router.put('/update/:id',controller.updatesingleuser);
router.delete('/delete/:id',controller.deleteuser);

router.post('/login',controller.userlogin);

//chatroom

router.post("/chatroom",controller.chatroom);
router.get("/allchatroom",controller.allchatrooms);  
module.exports = router;
