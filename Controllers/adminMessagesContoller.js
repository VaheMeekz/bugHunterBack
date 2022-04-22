const AdminMessages = require("../models").AdminMessages;

const createMessage =async (req, res) => {
  const { reciverId, message } = req.body;
  if (!(reciverId && message)) {
    return res.json({ messag: "badRequest" });
  }
  const id = reciverId.toString();
  const newMessage = await AdminMessages.create({ reciverId, message });
  const all = await AdminMessages.findAll({ where: { reciverId: id } });
  return res.json(all);
};

const thisUserMessages = async(req, res) => {
  const { reciverId } = req.body;
  if (!reciverId) {
    return res.json({ message: "bad request!" });
  }
  const id = reciverId.toString();
  const myMessages = await AdminMessages.findAll({ where: { reciverId: id } });
  if (!myMessages) {
    return res.json({ messag: "you havnt messages" });
  }
  return res.json(myMessages);
};

const myMessages =async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request" });
  }
  const my = await AdminMessages.findAll({ where: { reciverId: id } });
  if (!my) {
    return res.json({ messag: "you havnt messages" });
  }
  return res.json(my);
};

const deleteMessage = async(req, res) => {
  const { useId, id } = req.body;
  if (!id) {
    return res.json({ message: "bad request!" });
  }
  const thisMEssage = await AdminMessages.destroy({ where: { id } });
  const my = await AdminMessages.findAll({ where: { reciverId: useId } });
  if (!my) {
    return res.json({ messag: "you havnt messages" });
  }
  return res.json(my);
};

module.exports = {
  createMessage,
  thisUserMessages,
  myMessages,
  deleteMessage,
};
