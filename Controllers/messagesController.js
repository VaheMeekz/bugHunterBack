const { Op } = require("sequelize");
const Message = require("../models").Message;
// const User = require("../models").User;
const Notifications = require("../models").Notifications;

const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);

    const newNotes = await Notifications.create({
      message: newMessage.text,
      sender: newMessage.sender,
      reciver: newMessage.reciver,
      senderName: newMessage.senderName,
      senderAvatar: newMessage.senderAvatar,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

const myAllMessages = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "bad request!" });
  }

  const myMessages = await Message.findAll({ where: { reciver: id } });

  return res.json(myMessages);
};

const message = async (req, res) => {
  const reciver = req.params.id;
  const sender = req.user;

  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        { sender: sender, reciver: reciver },
        { sender: reciver, reciver: sender },
      ],
    },
    order: [["createdAt","ASC"]],
  });
  return res.json(messages);
};

const myMessages = async (req, res) => {
  const { srender, reciver } = req.body;
  console.log(reciver,"reciver",srender,"sender")

  if (!(srender && reciver)) {
    return res.json({ message: "bad request!" });
  }
  const messages = await Message.findAll({
    where: {
      sender: {
        [Op.or]: [srender, reciver],
      },
      reciver: {
        [Op.or]: [reciver, srender],
      },

    },
    // order: [["createdAt", "ASC"]],
    // limit:10
  });
  return res.json(messages);
};

const proritet = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ err: "bad request!" });
  }
};

const loadMore = async (req,res) => {
  const { srender, reciver } = req.body;

  if (!(srender && reciver)) {
    return res.json({ message: "bad request!" });
  }

  const messages = await Message.findAll({
    where: {
      sender: {
        [Op.or]: [srender, reciver],
      },
      reciver: {
        [Op.or]: [reciver, srender],
      },
    },
  });
  return res.json(messages);
}


module.exports = {
  addMessage,
  getMessage,
  myAllMessages,
  message,
  myMessages,
  proritet,
  loadMore
};
