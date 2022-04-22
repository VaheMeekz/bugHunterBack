const Notifications = require("../models").Notifications;

const myNotifications = async (req, res) => {
    const { id } = req.body;

  if (!id) {
    return res.json({ message: "bad request" });
  } else {
    const myNotifications = await Notifications.findAll({
      where: { reciver: id },
    });

    if (!myNotifications) {
      return res.json({ message: "you havnt messages!" });
    }

    return res.json(myNotifications);
  }
};
const deleteNotifications = async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.json({ message: "message not found!" });
    }
  
    const not = await Notifications.destroy({
      where: { id: id },
    });
    const allNotes = await Notifications.findAll();
    return res.json(allNotes);
};
const deleateUserNotifications = async (req, res) => {
    const { sender, reciver } = req.body;

    if (!(sender && reciver)) {
      return res.json({ message: "bad request!" });
    }
  
    const thisNotes = await Notifications.destroy({
      where: { sender: sender, reciver: reciver },
    });
    const myNotifications = await Notifications.findAll({
      where: { reciver },
    });
  
    return res.json(myNotifications);
};

module.exports = {
  myNotifications,
  deleteNotifications,
  deleateUserNotifications,
};
