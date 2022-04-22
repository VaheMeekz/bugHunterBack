var express = require("express");
const User = require("../models").User;
const db = require("../models");
let sequelize = db.sequelize;

const getTopHacker = async (req, res) => {
  try {
    const topHackers = await User.findAll({
      where: {
        userClass: "hacker",
      },
      order: [["totalBountiesPaid", "DESC"]],
      raw: true,
      limit: 10,
    });

    return res.json(topHackers);
  } catch (error) {
    return res.status(500).json({ message: "something is wrong!", error });
  }
};




module.exports = {
  getTopHacker,
};
