const Partner = require("../models").Parner;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bughunteram@mail.ru",
    pass: "Yanerop2000",
  },
});

const createPartner = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    businessAdress,
    phoneNumber,
    webSite,
    country,
    subject,
  } = req.body;

  try {
    const parner = await Partner.create({
      firstName,
      lastName,
      companyName,
      businessAdress,
      phoneNumber,
      webSite,
      country: toString(country),
      subject,
    });

    return res.json(parner);
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({ message: "something is wrong" });
  }
};
const getPartners = async (req, res) => {
  try {
    const parners = await Partner.findAll();
    return res.status(200).json(parners);
  } catch (error) {
    return res.status.json({ message: "something is wrong", statusCode: 200 });
  }
};
const sendAnswer = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    businessAdress,
    phoneNumber,
    webSite,
    country,
    subject,
  } = req.body;
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
const delPartner = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "Deleting data failed!", statusCode: 400 });
  }

  try {
    const allPartners = await Partner.destroy({
      where: { id: id },
    });
    const all = await Partner.findAll();
    return res.json(all);
  } catch (error) {
    return res.json({ message: "Deleting data failed!", statusCode: 500 });
  }
};

module.exports = {
  createPartner,
  getPartners,
  sendAnswer,
  delPartner,
};
