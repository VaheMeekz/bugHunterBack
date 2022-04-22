var express = require("express");
const { NUMBER } = require("sequelize");
const { connect } = require("../app");
const OrgPaid = require("../models").OrganizationPaid;

const createPaid = async (req, res) => {
  const { orgId, value, userId, userName, userAvatar, programId, programName } =
    req.body;

  console.log(
    "🚀 ~ file: orgPaid.js ~ line 17",
    "orgId",
    orgId,
    "value",
    value,
    "userId",
    userId,
    "userName",
    userName,
    "userAvatar",
    userAvatar,
    "programId",
    programId,
    "programName",
    programName
  );
  const realVal = Math.floor(value);
  if (!(orgId && value && userId && userName && programId && programName)) {
    return res.json({ message: "9999!" });
  }

  if (userAvatar == null) {
    const newPaiment = await OrgPaid.create({
      orgId: Number(orgId),
      value: realVal,
      userId,
      userName,
      userAvatar: "no avatar",
      programId,
      programName,
    });
  } else {
    newPaiment = await OrgPaid.create({
      orgId: Number(orgId),
      value: realVal,
      userId,
      userName,
      userAvatar,
      programId,
      programName,
    });
  }

  return res.json({ message: "payment is done!" });
};

const myPaiments = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad reequest!" });
  }
  const myPaiments = await OrgPaid.findAll({ where: { orgId: id } });
  if (!myPaiments) {
    return res.json({ message: "You havn't payments" });
  }
  return res.json(myPaiments);
};

module.exports = {
  createPaid,
  myPaiments,
};
