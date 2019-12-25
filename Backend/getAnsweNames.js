const router = require("express").Router();
const Form = require("./formSend");

router.get("/", async (req, res) => {
  try {
    var data = await Form.find().exec();
    let array = [];
    let i = 0;
    data.forEach(name => {
      array[i] = ({expirationTime: name.expirationTime, name: name.name, author: name.author, status: name.status});;
      i++;
    });
    newArr=[];
    i=0;
    array.forEach((name, j) => {
      if (name.status != "declined") {
        newArr[i] = name;
        i++
      }
    })

const newArray = Array.from(new Set(newArr.map(s => s.name)))
.map ( name => {
  return newArr.find(s => s.name == name)
})
res.send(newArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
