const express = require("express");

const userctr = require("../controller/userctr.js");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(userctr._getAllUsers)
  .post(userctr._findOneUser)
  .delete(userctr._deleteuser);
userRouter.route("/login").post(userctr._login);
userRouter.route("/register").post(userctr._checkregister, userctr._register);
userRouter.route("/:id").post(userctr._findIdByParams);
userRouter.route("/edit/:id").post(userctr._editOneUserById);

module.exports = userRouter;
