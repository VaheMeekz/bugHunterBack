const HightTarget = require('../models').hightPriorityTargets


const createHightTarget = async(req,res) => {
    const { hightTargets, program_id } = req.body

    try {
      const names = hightTargets.map((i) => i.firstName)
  
      let newTargets
      for (let value of names) {
        value += 1
        newTargets = await HightTarget.create({
          url: value.substr(0, value.length - 1),
          program_id,
        })
      }
      return res.json(newTargets)
    } catch (error) {
      return res.json({ message: 'something is wrong!' })
    }
} 


const myScope = async (req,res) =>{
    const { id } = req.body
    const findResult = await HightTarget.findAll({ where: { program_id: id } })
    return res.json(findResult)
}


module.exports = {
    createHightTarget,
    myScope
}