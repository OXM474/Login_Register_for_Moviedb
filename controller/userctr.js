const user = require("../models/models");

exports._checkregister = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      status: "fail",
      message: "Missing email, password, username",
    });
  }
  next();
};

exports._register = async (req, res) => {
  try {
    const finduser =
      ((await user.findOne({ name: req.body.name })) ||
        (await user.findOne({ email: req.body.email }))) &&
      (await user.findOne({ password: req.body.password }));
    if (finduser) {
      return res.status(409).send({
        status: "conflict",
        message: `User already exists`,
      });
    }
    newUser = await user.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Register Success",
      data: newUser,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports._login = async (req, res) => {
  try {
    const loginuser =
      (await user.findOne({ name: req.body.name })) ||
      (await user.findOne({ email: req.body.email }));
    if (!loginuser) {
      return res.status(401).json({
        status: "fail",
        message: "User not found!",
      });
    }
    if (loginuser.password !== req.body.password) {
      return res.status(401).json({
        status: "fail",
        message: "Wrong Password!",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Login Success",
      data: loginuser,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports._getAllUsers = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requesttime: req.requesttime,
      results: await user.find().length,
      data: await user.find(),
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports._findOneUser = async (req, res) => {
  try {
    const finduser =
      (await user.findOne({ name: req.body.name })) ||
      (await user.findOne({ email: req.body.email })) ||
      (await user.findById(req.body.id));
    if (!finduser) {
      return res.status(401).json({
        status: "fail",
        message: "User not found!",
      });
    }
    res.status(200).json({
      status: "success",
      data: finduser,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports._findIdByParams = async (req, res) => {
  try {
    const finduser = await user.findById(req.params.id);
    if (!finduser) {
      return res.status(401).json({
        status: "fail",
        message: "User not found!",
      });
    }
    res.status(200).json({
      status: "success",
      data: finduser,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports._deleteuser = async (req, res) => {
  try {
    const finduser =
      (await user.findOne({ name: req.body.name })) ||
      (await user.findOne({ email: req.body.email })) ||
      (await user.findById(req.body.id));
    if (!finduser) {
      return res.status(401).json({
        status: "fail",
        message: "User not found!",
      });
    }
    (await user.findOneAndDelete({ email: req.body.email })) ||
      (await user.findOneAndDelete({ name: req.body.name })) ||
      (await user.findByIdAndDelete(req.body.id));
    res.status(200).json({
      status: "sucess",
      message: `User ${finduser.name} has been deleted !`,
      data: await user.find(),
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};

exports._editOneUserById = async (req, res) => {
  try {
    let updateData = req.body;
    const finduser = await user.findById(req.params.id);
    if (!finduser) {
      return res.status(401).json({
        status: "fail",
        message: "User not found!",
      });
    }
    await user.findByIdAndUpdate(req.params.id, updateData);
    res.status(200).json({
      status: "success",
      message: "Updated successfully.",
      EditedData: await user.findById(req.params.id),
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something Went Wrong !",
      error: process.env.node_env == "development" ? err : err.message,
    });
  }
};
