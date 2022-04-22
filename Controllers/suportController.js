const Suport = require("../models").Suport;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bughunteram@mail.ru",
    pass: "Yanerop2000",
  },
});

const createSuport = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name && !email && !message) {
    return res.json({ error: "bad request!" });
  }
  const suport = await Suport.create({ name, email, message });
  return res.json({ message: "Your Suport Message Is Sended!" });
};

const getAllSuports = async (req, res) => {
  const suport = await Suport.findAll();
  if (!suport) {
    return res.json({ message: "something is wrong!" });
  }
  return res.json(suport);
};

const delSuport = async (req, res) => {
  if (!id) {
    return res.json({ message: "bad request" });
  }
  try {
    const suport = await Suport.destroy({
      where: { id: id },
    });
    const all = await Suport.findAll();
    return res.json(all);
  } catch (error) {
    return res.json({ message: "Deleting data failed!" });
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
module.exports = {
  createSuport,
  getAllSuports,
  delSuport,
  sendAnswer,
};
