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
    let unique = {};
    let distinct = [];
    for (let j in array) {
      if (typeof unique[array[j]] == "undefined") {
        distinct.push(array[j]);
      }
      unique[array[j]] = 0;
    }
    res.send(distinct);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
