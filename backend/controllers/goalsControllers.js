const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");

//* @desc   get     goals
//* route   GET     /api/goals
//* access  private
const getGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find();

  res.status(200).json(goal);
});

//* @desc   set goal
//* route   SET /api/goal
//* access  private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

//* @desc   edit goal
//* route   PUT /api/goal
//* access  private
const putGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});





//* @desc   delete goal
//* route   DELETE /api/goal
//* access  private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Delete goal: ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  putGoal,
  deleteGoal,
};
