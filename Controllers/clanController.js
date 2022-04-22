const { Op } = require("sequelize");
const User = require("../models").User;
const Clan = require("../models").Clan;

const getClans = async (req, res) => {
  try {
    const clans = await Clan.findAll();

    return res.json(clans);
  } catch (error) {
    return res.status(500).json({ message: "something is wrong!" });
  }
};

const createClan = async (req, res) => {
  const { name, id } = req.body;
  try {
    const condidat = await Clan.findAll({ where: { name } });
    if (condidat.length > 0) {
      return res.json({ error: "Clan whith this name alrady exist!" });
    } else {
      const clans = await Clan.create({ name });
      const thisUser = await User.findOne({ where: { id: id } });

      if (!thisUser) {
        return res.json({ message: "user is not found!" });
      }
      thisUser.clanId = clans.id;
      thisUser.creatorClanId = 1;
      thisUser.save();

      return res.json(clans);
    }
  } catch (error) {
    return res.status(500).json({ message: "something is wrong!" });
  }
};

const deleateClan = async (req, res) => {
  const { id } = req.body;
  const allClans = await Clan;
  if (!id) {
    return res.json({ message: "Deleting data failed!", statusCode: 400 });
  }

  try {
    allClans.destroy({
      where: { id: id },
    });

    const all = await Clan.findAll();
    return res.json(all);
  } catch (error) {
    return res.json({ message: "Deleting data failed!", statusCode: 500 });
  }
};

const myClan = async (req, res) => {
  const { id } = req.body;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.json(0);
  }

  if (user.userClass == "hacker") {
    const myClan = await Clan.findOne({ where: { id: user.clanId } });

    if (!user) {
      return res.json({ message: "user not found" });
    }

    if (!myClan) {
      return res.json({ message: "clan not found" });
    }

    return res.json(myClan);
  } else return res.json({ message: 0 });
};

const clanMembers = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "bad request!" });
  }

  const user = await User.findOne({ where: { id } });

  clanId = user.clanId;

  if (!clanId) {
    return res.json({ message: "clan not found" });
  }

  const team = await User.findAll({ where: { clanId } });

  return res.json([team]);
};

const logoutClan = async (req, res) => {
  const { id } = req.body;

  let thisUser = await User.findOne({ where: { id } });

  let newCreator = await User.findAll({
    where: {
      clanId: thisUser.clanId,
      id: {
        [Op.ne]: [id],
      },
    },
  });

  const creatorNew = await newCreator.sort().reverse();
  if (creatorNew.length == 0) {
    const thisClan = await Clan.destroy({ where: { id: thisUser.clanId } });
    thisUser.clanId = null;
    thisUser.creatorClanId = null;
    thisUser.save();
    return res.json(thisClan);
  } else {
    creatorNew[0].creatorClanId = 1;
    creatorNew[0].ClanOficer = "none";
    await newCreator[0].save();
    thisUser.clanId = null;
    thisUser.creatorClanId = null;

    thisUser.creatorClanId !== null ? (thisUser.creatorClanId = null) : null;
    thisUser.save();
    return res.json(thisUser);
  }
};

const clanScore = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request" });
  }
  const thisClan = await Clan.findOne({ where: { id: id } });
  return res.json(thisClan.score);
};

const myClanAvatar = async (req, res) => {
  const { url, clanId } = req.body;

  if (!(url, clanId)) {
    return res.json({ message: "bad request" });
  }

  const thisClan = await Clan.findOne({ where: { id: clanId } });

  if (!thisClan) {
    return res.json({ message: "clan not found!" });
  }

  thisClan.clanAvatar = url;
  thisClan.save();

  return res.json(thisClan.clanAvatar);
};

const editAvatar = async (req, res) => {
  const { url, clanId } = req.body;

  if (!(url, clanId)) {
    return res.json({ message: "bad request" });
  }

  const thisClan = await Clan.findOne({ where: { id: clanId } });

  thisClan.clanAvatar = url;
  thisClan.save();

  return res.json(thisClan);
};

const clanAvatar = async (req, res) => {
  const { id } = req.body;
  const thisClan = await Clan.findOne({ where: { id } });
  return res.json(thisClan.clanAvatar);
};

const deleateMyClanAvatar = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "bad request!" });
  }

  const thisClan = await Clan.findOne({ where: { id } });

  if (!thisClan) {
    return res.json({ message: "Clan not Found!" });
  }

  thisClan.clanAvatar = null;
  thisClan.save();

  return res.json(thisClan.clanAvatar);
};

const addAboutClan = async (req, res) => {
  const { clanId, text } = req.body;

  if (!(clanId && text)) {
    return res.json({ message: "badRetuest" });
  }

  const thisClan = await Clan.findOne({ where: { id: clanId } });

  thisClan.about = text;

  thisClan.save();

  return res.json(thisClan.about);
};

const aboutMyClan = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request!" });
  }
  const thisClan = await Clan.findOne({ where: { id } });
  return res.json(thisClan.about);
};

const paginationClans = async (req, res) => {
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 8;
  console.log(req.query.offset, req.query.limit, "offset,limit");
  const all = await Clan.findAll();
  const clans = await Clan.findAll({
    offset: offset * limit,
    limit,
  });
  return res.json({ hackers: clans, count: all.length });
};

module.exports = {
  getClans,
  createClan,
  deleateClan,
  myClan,
  clanMembers,
  logoutClan,
  clanScore,
  myClanAvatar,
  editAvatar,
  clanAvatar,
  deleateMyClanAvatar,
  addAboutClan,
  aboutMyClan,
  paginationClans,
};
