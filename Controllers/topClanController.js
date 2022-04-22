var express = require("express");
const Clan = require("../models").Clan;
const db = require("../models");
let sequelize = db.sequelize;



const getTopClan = async (req,res) => {
    try {
        const topClans = await Clan.findAll({
          order: [["score", "DESC"]],
          raw: true,
          limit: 10,
        });
  
        return res.json(topClans);
      } catch (error) {
        return res.status(500).json({ message: "something is wrong!" });
      }
}

module.exports = {
    getTopClan
}
