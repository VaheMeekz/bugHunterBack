const Programs = require("../models").Progs;
const Reports = require("../models").Reports;
const User = require("../models").User;

const createReport = async (req, res) => {
  const {
    asset,
    weakness,
    severity,
    title,
    description,
    additionlInfo,
    user_id,
    program_id,
    creator,
    avatar,
  } = req.body;

  if (
    !(
      asset &&
      weakness &&
      severity &&
      title &&
      description &&
      additionlInfo &&
      program_id &&
      creator
    )
  ) {
    return res.json({
      error: ["All fields are required"],
    });
  }

  let newReport;
  try {
    newReport = await Reports.create({
      asset,
      weakness,
      severity,
      title,
      description,
      additionlInfo,
      user_id,
      program_id,
      creator,
      creatorAvatar: avatar,
    });
  } catch (error) {
    return res.json({
      error: ["All fields are required"],
    });
  }

  return res.json(newReport);
};

const getReport = async (req, res) => {
  const allReports = await Reports.findAll();

  if (!allReports) {
    return res.json({ message: "reports not found", statusCode: 400 });
  }
  return res.json(allReports);
};

const deleteReport = async (req, res) => {
  const { id } = req.body;
  const allReports = await Reports;
  if (!id) {
    return res.json({ message: "Deleting data failed!", statusCode: 400 });
  }

  try {
    allReports.destroy({
      where: { id: id },
    });
    const all = await Reports.findAll();
    return res.json(all);
  } catch (error) {
    return res.json({ message: "Deleting data failed!", statusCode: 500 });
  }
};

const updateReport = async (req, res) => {
  const {
    id,
    asset,
    weakness,
    severity,
    title,
    description,
    additionlInfo,
    user_id,
    program_id,
  } = req.body;

  if (!id) {
    return res.json({
      error: ["Reports with given id not found"],
    });
  }

  const rep = await Reports.findByPk(id);

  if (!rep) {
    return res.json({
      error: ["Reports with given id not found"],
    });
  }

  if (
    !(
      asset &&
      weakness &&
      severity &&
      title &&
      description &&
      additionlInfo &&
      user_id &&
      program_id
    )
  ) {
    return res.json({
      error: ["All fields are required"],
    });
  }
  rep.asset = asset;
  rep.weakness = weakness;
  rep.severity = severity;
  rep.title = title;
  rep.description = description;
  rep.additionlInfo = additionlInfo;
  rep.user_id = user_id;
  rep.program_id = program_id;

  try {
    await rep.save();
  } catch (error) {
    return res.json({
      error: ["All fields are required"],
    });
  }

  return res.json(rep);
};

const updateStatus = async (req, res) => {
  const { id, status } = req.body;

  if (!id) {
    return res.status(400).json({ message: "bad request!" });
  }
  try {
    const allReports = await Reports.findOne({ where: { id } });
    if (!allReports && !status) {
      return res.json({ status: "bad request!", statusCode: 500 });
    }
    allReports.status = status;
    allReports.save();
    const all = await Reports.findAll({ where: { status: "new" } });
    return res.json(all);
  } catch (e) {
    return res.json({ status: "id in not requirer", statusCode: 500 });
  }
};

const myReports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "bad request!" });
  }
  const myReports = await Reports.findAll({ where: { user_id: id } });
  if (!myReports) {
    return res.json({ message: "reports not found!" });
  }
  return res.json(myReports);
};

const likeReports = async (req, res) => {
  const { id } = req.body;

  const thisProg = await Reports.findOne({ where: { id } });

  if (!thisProg) {
    return res.json({ message: "report not found" });
  }
  thisProg.like = 1;
  thisProg.save();

  const userId = thisProg.user_id;

  const userProg = await User.findOne({ where: { id: userId } });

  userProg.likes = userProg.likes + 1;
  userProg.save();

  return res.json(thisProg);
};

const unlikeReports = async (req, res) => {
  const { id } = req.body;

  const thisProg = await Reports.findOne({ where: { id } });

  if (!thisProg) {
    return res.json({ message: "report not found" });
  }
  thisProg.like = 1;

  const userId = thisProg.user_id;

  const userProg = await User.findOne({ where: { id: userId } });

  userProg.likes = userProg.likes - 1;
  userProg.save();

  return res.json(thisProg);
};

const deleateMyReport = async (req, res) => {
  const { id, userId } = req.body;
  if (!(id && userId)) {
    return res.json({ message: "bad request!" });
  }
  const thisRep = await Reports.destroy({ where: { id } });
  const myAll = await Reports.findAll({ where: { creator: userId } });
  if (!myAll) {
    return res.json({ message: "you havn't reports" });
  }
  return res.json(myAll);
};

module.exports = {
  createReport,
  getReport,
  deleteReport,
  updateReport,
  updateStatus,
  myReports,
  likeReports,
  unlikeReports,
  deleateMyReport,
};
