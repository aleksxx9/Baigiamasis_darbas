const router = require("express").Router();
const Form = require("./hireSend");

router.get("/", async (req, res) => {
  try {
    var data = await Form.find().exec();
    let array = [];
    let i = 0;
    data.forEach(name => {
      array[i] = ({author: name.author, name: name.name});
      i++;
    });
    const newArr = Array.from(new Set(array.map(s => s.name)))
    .map ( name => {
      return array.find(s => s.name == name)
    })
    res.send(newArr);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
