const router = require("express").Router();
const Form = require("./Form");

router.get("/", async (req, res) => {
  try {
    var data = await Form.find().exec();
    let array = [];
    let i = 0;
    data.forEach(name => {
      array[i] = ({ role: name.role, expirationTime: name.expirationTime, author: name.author, name: name.name, author: name.author});
      i++;
    })
    res.json(array);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
