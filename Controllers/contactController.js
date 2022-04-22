const nodemailer = require("nodemailer");
const Contact = require("../models").Contact;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bughunteram@mail.ru",
    pass: "Yanerop2000",
  },
});

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status.json({ message: "something is wrong", statusCode: 200 });
  }
};

const createContact = async (req, res) => {
  const { email, message } = req.body;

  try {
    const contact = await Contact.create({ email, message });

    return res.json(contact);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: "something is wrong" });
  }
};

const sendAnswer = async (req, res) => {
  const { email, message } = req.body;

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
  const allContacts = await Contact;

  if (!id) {
    return res.json({ message: "Deleting data failed!", statusCode: 400 });
  }

  try {
    allContacts.destroy({
      where: { id: id },
    });
    return res.json({ message: "Removed Successfully!" });
  } catch (error) {
    return res.json({ message: "Deleting data failed!", statusCode: 500 });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  sendAnswer,
  deleateContact,
};
