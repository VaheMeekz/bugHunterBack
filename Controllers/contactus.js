require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bughunteram@mail.ru",
    pass: "Yanerop2000",
  },
});

const Contactus = require("../models").Contactus;

const createContactUs = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await Contactus.create({ name, email, subject, message });

    return res.json(contact);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: "something is wrong" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contactus.findAll();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status.json({ message: "something is wrong", statusCode: 200 });
  }
};

const sendAnswer = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!message && !email) {
    return res.json({ message: "message not founding!", statusCode: 500 });
  }
  try {
    transporter.sendMail(
      {
        from: "vaheemkrtchyan@gmail.com",
        to: email,
        subject: "Bug Hunter",
        text: message,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    return res.json({ message: "message is sending!", statusCode: 200 });
  } catch (error) {
    return res.json({ error: "bad request!", statusCode: 500 });
  }
};

const deleateContact = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "Deleting data failed!", statusCode: 400 });
  }

  try {
    const allContacts = await Contactus.destroy({
      where: { id: id },
    });
    // allContacts.save();
    const all = await Contactus.findAll();
    return res.json(all);
  } catch (error) {
    return res.json({ message: "Deleting data failed!", statusCode: 500 });
  }
};

module.exports = {
  createContactUs,
  getAllContacts,
  sendAnswer,
  deleateContact,
};
