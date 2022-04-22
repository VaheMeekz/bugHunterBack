const Interested = require("../models").Interested;
const Program = require("../models").Progs;

const createInterest = async (req, res) => {
  const {
    userId,
    programId,
    name,
    programText,
    minPrice,
    maxPrice,
    orgAvatar,
  } = req.body;
  //   console.log(
  //     "  userId, programId,-name,programText,minPrice,maxPrice,orgAvatar,",
  //     userId,
  //     programId,
  //     name,
  //     programText,
  //     minPrice,
  //     maxPrice,
  //     orgAvatar
  //   );

  if (
    !(userId && programId && name && programText && minPrice && maxPrice,
    orgAvatar)
  ) {
    return res.json({ message: "bad request!" });
  }

  const thisProgram = await Program.findOne({ where: { id: programId } });

  if (!thisProgram) {
    return res.json({ message: "program not found!" });
  }

  const interestedProgram = await Interested.create({
    userId,
    programId,
    name,
    programText,
    minPrice: minPrice[0],
    maxPrice: maxPrice,
    orgAvatar: orgAvatar,
  });

  return res.json(interestedProgram);
};

const changeStstus = async (req, res) => {
  const { userId, programId } = req.body;
  if (!(userId && programId)) {
    return res.json({ message: "bad request!" });
  }
  const del = await Interested.destroy({
    where: { programId },
  });
  return res.json(del);
};

const myInterests = async (req, res) => {
  const { userId } = req.body;
  const user = await Interested.findAll({ where: { userId } });
  return res.json(user);
};

const deleateInterest = async (req, res) => {
  const { userId, id } = req.body;
  if (!(userId && id)) {
    return res.json({ message: "bad requst!" });
  }
  const thisInteres = await Interested.destroy({ where: { id } });

  const user = await Interested.findAll({ where: { userId } });
  if (!user) {
    return res.json({ mesasge: "You havnt interested programs!" });
  }
  return res.json(user);
};

const programs = async (req, res) => {
  const { userId, programId } = req.body;

  if (!(userId && programId)) {
    return res.json({ message: "bad request!" });
  }

  const prog = await Interested.findOne({ where: { userId, programId } });

  if (!prog) {
    return res.json({ message: 0 });
  }

  return res.json({ message: 1 });
};
module.exports = {
  createInterest,
  changeStstus,
  myInterests,
  deleateInterest,
  programs,
};
