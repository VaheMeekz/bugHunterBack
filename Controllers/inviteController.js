const Invite = require("../models").ClanInvite;
const User = require("../models").User;

const createInvite = async (req, res) => {
  const { id, inviteUserId, clanName, creatorName, clanAvatar } = req.body;

  if (!(id && inviteUserId)) {
    return res.json({ message: "fildes is requaier!" });
  }

  const newInvite = await Invite.create({
    creatorId: id,
    inviteUserId,
    status: "new",
    clanName,
    creatorName,
    clanAvatar,
  });

  return res.json(newInvite);
};

const myInvites = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "bad request!" });
  }

  const invites = await Invite.findAll({
    where: { inviteUserId: id, status: "new" },
  });
  if (!invites) {
    return res.json(false);
  }

  return res.json(invites);
};

const haveInvite = async (req, res) => {
  const { sender, reciver } = req.body;

  if (!(sender && reciver)) {
    return res.json({ message: "something is wrong!" });
  }

  const haveInvite = await Invite.findAll({
    where: { creatorId: sender, inviteUserId: reciver },
  });

  if (haveInvite.length > 0) {
    return res.json(false);
  } else res.json(true);
};

const deleateInvite = async (req, res) => {
  const { sender, reciver } = req.body;
  if (!(sender && reciver)) {
    return res.json({ message: "something is wrong!" });
  }

  const haveInvite = await Invite.destroy({
    where: { creatorId: sender, inviteUserId: reciver },
  });

  return res.json({ message: "Invite Is Deleted!" });
};

const changeStatus = async (req, res) => {
  const { senderId, reciverId, status } = req.body;

  if (!(senderId && reciverId && status)) {
    return res.json({ message: "bad request!" });
  }

  const thisUser = await User.findOne({ where: { id: senderId } });

  const reciver = await User.findOne({ where: { id: reciverId } });

  const clan = await User.findOne({ where: { id: senderId } });

  const invite = await Invite.findOne({
    where: { creatorId: senderId, inviteUserId: reciverId },
  });

  invite.status = status;

  invite.save();

  if (!(reciver && thisUser)) {
    return res.json({ message: "invites not found" });
  }

  reciver.clanId = thisUser.clanId;
  reciver.ClanOficer = "ordinary";

  reciver.save();

  const myAllInvites = await Invite.destroy({
    where: { inviteUserId: reciverId },
  });

  return res.json(reciver);
};

const rejectInvite = async (req, res) => {
  const { inviteId } = req.body;
  if (!inviteId) {
    return res.json({ message: "invite not found" });
  }

  const invite = await Invite.destroy({ where: { id: inviteId } });
  const thisUSer = invite.inviteUserId;
  // const all = await Invite.findAll({ where: { inviteUserId: thisUSer } })
  return res.json(invite);
};

module.exports = {
  createInvite,
  myInvites,
  haveInvite,
  deleateInvite,
  changeStatus,
  rejectInvite,
};
