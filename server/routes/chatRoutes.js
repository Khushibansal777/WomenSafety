const Router = require("express");
const router = Router();
const {addChats,getChats} = require('../controllers/chatController')
const validateToken = require('../middlewares/validateToken');

router.route('/').post(addChats);
router.route('/:id/emergency/:emerg').get(getChats);



module.exports = router;