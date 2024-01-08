const router = require('express').Router();
const UserController=require("../controllers/user.controller");
const {verifyToken,verifyTokenAdmin}=require("../middlewares/verifyToken.middleware");


router.get('/',verifyTokenAdmin,UserController.getAllUsers);
router.delete('/:id',UserController.deleteOneUser);

module.exports = router;
