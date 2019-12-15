const router = require("express").Router();
const Form = require("./Form");

router.get("/", async (req, res) => {
  try {
    var data = await Form.find().exec();
    let array = [];
    let i = 0;
    let show = 1;
    
    data.forEach(name => {
      show = 0;
      name.author.forEach(author => {
        if (req.headers.name == author.name)
        {
          show = 1;
        }
      })
      if (show == 1)
      {
        array[i] = ({ role: name.role, expirationTime: name.expirationTime, author: name.author, name: name.name, author: name.author});
        i++;
      }
     
    })
    res.json(array);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
