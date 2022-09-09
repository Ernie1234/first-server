const asyncHandler = require("express-async-handler");

//* @desc   get     goals
//* route   GET     /api/goals
//* access  private
const getGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ msg: "Get goals!" });
});

//* @desc   set goal
//* route   SET /api/goal
//* access  private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ msg: req.body.text });
})

//* @desc   edit goal
//* route   PUT /api/goal
//* access  private
const putGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Update goal: ${req.params.id}` });
})

//* @desc   delete goal
//* route   DELETE /api/goal
//* access  private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Delete goal: ${req.params.id}` });
})

module.exports = {
  getGoals,
  setGoal,
  putGoal,
  deleteGoal,
};
