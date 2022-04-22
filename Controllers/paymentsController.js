const User = require("../models").User;
const Payment = require("../models").Payment;

const createPayment = async (req, res) => {
  const { orgId, HackId, value, progId, name } = req.body;
  if (!(orgId && HackId && value && progId && name)) {
    return res.json({ message: "badRequest" });
  }
  const thisUser = await User.findOne({ where: { id: orgId } });
  thisUser.totalBountiesPaid =
    parseInt(thisUser.totalBountiesPaid) + parseInt(value);
  thisUser.save(); //averageBounty
  const neyPay = await Payment.create({
    orgId: orgId,
    hackerId: HackId,
    progId: progId,
    value: value,
    name,
  });
  return res.json(neyPay);
};

const myPayments = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ message: "bad request!" });
  }
  const myPays = await Payment.findAll({ where: { hackerId: id } });
  if (!myPays) {
    return res.json({ message: "you havnmt payments" });
  }
  return res.json(myPays);
};

module.exports = {
  createPayment,
  myPayments,
};
