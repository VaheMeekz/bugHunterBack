var express = require("express");
var router = express.Router();
const Avatar = require("../models").Avatar;
const User = require("../models").User;

const createAvatar = async (req, res) => {
  const { userId, img } = req.body;

  if (!(img && userId)) {
    return res.json({ message: "bad request" });
  }

  try {
    const thisUser = await User.findOne({ where: { id: userId } });

    thisUser.averageBounty = img.toString();
    thisUser.save();
    const avatar = await Avatar.create({ img, user_id: userId });

    return res.json(avatar);
  } catch (error) {
    return res.json({ message: " 123!" });
  }
};

const getMyAvatar = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.json({ message: "bad request" });
  }

  const avatar = await Avatar.findOne({ where: { user_id: userId } });

  if (!avatar) {
    return res.json({ message: "something is wrong" });
  }

  return res.json(avatar);
};

const editAvatar = async (req, res) => {
  const { id, img } = req.body;

  if (!(id && img)) {
    return res.json({ message: "bad request!" });
  }

  const thisUser = await Avatar.findOne({ where: { user_id: id } });
  const user = await User.findOne({ where: { id } });

  if (!(thisUser && user)) {
    return res.json({ message: "user  is not found!" });
  }

  thisUser.img = img;
  user.averageBounty = img;
  user.save();
  return res.json(thisUser);
};

module.exports = {
  createAvatar,
  getMyAvatar,
  editAvatar,
};
