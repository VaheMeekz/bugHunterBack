var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const Admin = require("../models").Admin;

const createAdmin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!email && !password && !userName) {
      return res.json({
        error: ["Name, password and email are required fields"],
      });
    }
    const old = await Admin.findOne({
      where: { email },
    });
    if (old) {
      return res.json({
        error: ["User with this email already exists"],
      });
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    let admin;
    try {
      admin = await Admin.create({
        userName,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
    } catch (e) {
      return res.json({ error: e.errors.map((i) => i.message) });
    }
    const token = jwt.sign({ admin_id: admin.id }, process.env.TOKEN_KEY);
    admin.token = token;
    admin.save();
    return res.status(200).json(admin);
  } catch (error) {
    return res.json({ error: error.message, statusCode: 500 });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email, password :", email, password);

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }
    const admin = await Admin.findOne({
      where: { email },
    });
    console.log("condidat :", admin);

    if (!admin) {
      return res.json({ err: "admin not found!" });
    }

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { admin_uuid: admin.uuid, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      admin.token = token;
      console.log("admin.token :", admin.token);
      admin.save();
      return res.json(admin);
    }
  } catch (error) {
    return res.status(500).json({ message: "admin is invalid!!!" });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};
