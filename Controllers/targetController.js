const Target = require("../models").targets;

const createTarget = async (req, res) => {
  const { targets, program_id } = req.body;

  try {
    const names = targets.map((i) => i.firstName);

    let newTargets;
    for (let value of names) {
      value += 1;
      newTargets = await Target.create({
        url: value.substr(0, value.length - 1),
        program_id,
      });
    }
    return res.json(newTargets);
  } catch (error) {
    return res.json({ message: "123!" });
  }
};

const myScope = async (req, res) => {
  const { id } = req.body;
  const findResult = await Target.findAll({ where: { program_id: id } });
  return res.json(findResult);
};

module.exports = {
  createTarget,
  myScope,
};
