const Progs = require("../models").Progs;
const Retest = require("../models").Retest;

const createProgram = async (req, res) => {
  const {
    name,
    about,
    progText,
    url,
    creatorId,
    minTargets,
    maxTargets,
    minHightTargets,
    maxHightTargets,

    minTargetsMedium,
    maxTargetsMedium,
    minHightTargetsMedium,
    maxHightTargetsMedium,

    minTargetsHight,
    maxTargetsHight,
    minHightTargetsHight,
    maxHightTargetsHight,
  } = req.body;

  const prices = [
    minTargets,
    maxTargets,
    minHightTargets,
    maxHightTargets,

    minTargetsMedium,
    maxTargetsMedium,
    minHightTargetsMedium,
    maxHightTargetsMedium,

    minTargetsHight,
    maxTargetsHight,
    minHightTargetsHight,
    maxHightTargetsHight,
  ];

  if (
    !(
      name &&
      about &&
      progText &&
      minTargets &&
      maxTargets &&
      minHightTargets &&
      maxHightTargets
    )
  ) {
    return res.json({ message: "bad request" });
  }

  const max = prices.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const min = prices.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });

  const targetsLow = [minTargets, maxTargets];

  const maxTarg = targetsLow.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const minTarg = targetsLow.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });

  const hightTargets = [minHightTargets, maxHightTargets];

  const maxHightTarg = hightTargets.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const minHightTarg = hightTargets.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });

  const targMedum = [minTargetsMedium, maxTargetsMedium];
  const maxTargMed = targMedum.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const minTargMed = targMedum.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });
  const hightTargMedium = [minHightTargetsMedium, maxHightTargetsMedium];
  const targHMedum = [minTargetsMedium, maxTargetsMedium];
  const maxHightTargMed = targHMedum.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const minHightTargMed = targHMedum.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });

  const targHight = [minTargetsHight, maxTargetsHight];
  const maxTargHight = targHight.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const minTargHight = targHight.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });

  const hightTargH = [minHightTargetsHight, maxHightTargetsHight];
  const maxHH = hightTargH.reduce(function (a, b) {
    return Math.max(parseInt(a), parseInt(b));
  });
  const minHH = hightTargH.reduce(function (a, b) {
    return Math.min(parseInt(a), parseInt(b));
  });
  try {
    const newProg = await Progs.create({
      name,
      about,
      progText,
      url,
      minPrice: min,
      maxPrice: max,
      creatorId,
      minTargetsLow: minTarg,
      maxTargetsLow: maxTarg,
      minHightTargetsLow: minHightTarg,
      maxHightTargetsLow: maxHightTarg,

      minTargetsMedium: minTargMed,
      maxTargetsMedium: maxTargMed,
      minHightTargetsMedium: minHightTargMed,
      maxHightTargetsMedium: maxHightTargMed,

      minTargetsHight: minTargHight,
      maxTargetsHight: maxTargHight,
      minHightTargetsHight: minHH,
      maxHightTargetsHight: maxHH,
    });

    return res.json(newProg.id);
  } catch (error) {
    return res.json({ message: error });
  }
};

const getPrograms = async (req, res) => {
  const allPrograms = await Progs.findAll();
  res.json(allPrograms);
};

const updateProgram = async (req, res) => {
  const { id, name, about, url, minPrice, maxPrice, programText } = req.body;

  if (!id) {
    return res.json({
      error: ["Id requeired"],
    });
  }

  const prog = await Progs.findByPk(id);
  if (!prog) {
    return res.json({
      error: ["Reports with given id not found"],
    });
  }

  if (!(name && about && url && minPrice && maxPrice && programText)) {
    return res.json({
      error: ["All fields are required"],
    });
  }

  prog.name = name;
  prog.about = about;
  prog.url = url;
  prog.minPrice = minPrice;
  prog.maxPrice = maxPrice;
  prog.progText = programText;

  try {
    await prog.save();
  } catch (error) {
    return res.json({
      error: error.errors.map((i) => i.message),
    });
  }

  return res.json(prog);
};

const mtPrograms = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request!" });
  }
  const myProgs = await Progs.findAll({ where: { creatorId: id } });
  if (!myProgs) {
    return res.json({ message: "No Programs" });
  }
  return res.json(myProgs);
};

const createRetest = async (req, res) => {
  const { programId, status } = req.body;
  const newRetest = await Retest.create({ programId, status: "new" });
  return res.json(newRetest);
};

const deleteProgram = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request" });
  }
  const thisProg = await Progs.destroy({ where: { id } });
  const all = await Progs.findAll();
  return res.json(all);
};

const thisOrganizationProgram = async (req, res) => {
  const id = req.params["id"];
  const thisProg = await Progs.findOne({ where: { id } });
  return res.json(thisProg);
};

const thisProgram = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request" });
  }
  const thisProg = await Progs.findOne({ where: { id } });
  return res.json(thisProg);
};

module.exports = {
  createProgram,
  getPrograms,
  updateProgram,
  mtPrograms,
  createRetest,
  deleteProgram,
  thisOrganizationProgram,
  thisProgram,
};
