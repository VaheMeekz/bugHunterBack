const Retest = require("../models").Retest;

const createRetest = async (req, res) => {
  const { programId, status, name, programText, minPrice, maxPrice, creator } =
    req.body;

  if (!(programId && status)) {
    return res.json({ message: "bad request!" });
  }

  const newRetest = await Retest.create({
    programId,
    status,
    name,
    programText,
    minPrice,
    maxPrice,
    creator,
  });

  return res.json(newRetest);
};

const getAllRetests = async (req, res) => {
  const allRetestes = await Retest.findAll();
  return res.json(allRetestes);
};

const changeRetestStatus = async (req, res) => {
  const { programId, status } = req.body;
  if (!(programId && status)) {
    return res.json({ error: "bad request!" });
  }
  const thisRetest = await Retest.create({ programId, status });
  return res.json(thisRetest);
};

const myRetests = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ messag: "bad request" });
  }
  const myReports = await Retest.findAll({ where: { creator: id } });
  return res.json(myReports);
};

const deleteRetest = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ messag: "bad request" });
  }
  const thisRetest = await Retest.destroy({ where: { programId: id } });
  const myReports = await Retest.findAll({ where: { creator: id } });
  return res.json(myReports);
};

module.exports = {
  createRetest,
  getAllRetests,
  changeRetestStatus,
  myRetests,
  deleteRetest,
};
