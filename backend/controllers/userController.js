const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandle = require("express-async-handler");
const User = require("../model/userModel");

//* @desc   register users
//* route   POST     /api/users/
//* access  public
const registerUser = asyncHandle(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields!");
  }

  //*IF USER EMAIL ALREADY EXIST
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User email already exist");
  }

  //*HASHING OF PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //*CREATING A NEW USER
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

//* @desc   login users
//* route   POST     /api/users/login
//* access  public
const loginUser = asyncHandle(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

//* @desc   get user
//* route   GET     /api/users/me
//* access  private
const getMe = asyncHandle(async (req, res) => {
  const { id, name, email } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email,
  })
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
