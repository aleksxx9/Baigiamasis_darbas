const router = require("express").Router();
const User = require("./User");

router.get("/", async (req, res) => {
  try {
    var data = await User.find().exec();
    let array = [];
    let i = 0;
    data.forEach(name => {
        array[i] = ({ email: name.email});;
        i++;
    });
    return res.send(array);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;

