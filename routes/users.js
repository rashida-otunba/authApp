var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User } = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // res.send("respond with a resource");
  // const users = await User.findAll(); //referencing the model name from the models folder
  // console.log(users);
  // res.json(users);
  //render the file based on the view engine
  res.render('index');
});

router.post("/register", async (req, res, next) => {
  let { username, password, email } = req.body;
  // const saltRounds = bcrypt.genSaltSync(5);
  // const hash = bcrypt.hashSync(password, saltRounds);
  // console.log(username, password, email); 

  const newUser = await User.create({
    username: username,
    password: hash,
    email: email,
  });

  res.json({
    id: newUser.id,
  });

  res.send("User add");
});


// router.post("/register", (req, res, next) => {
//   const password = "hello";

//   const saltRounds = bcrypt.genSaltSync(5);
//   //We don’t have to now but we should also put the salt # into a .env file
//   const hash = bcrypt.hashSync(password, saltRounds);

//   console.log("my password: ", password);
//   console.log("my hashed password: ", hash);

//   // bcrypt.hash(myPassword, saltRounds, (err, hash) => {});

//   res.send("User add");
// });

router.post("/login", async(req, res, next) => {

  const  {username, password}=req.body;

  // const saltRounds = bcrypt.genSaltSync(5);
  // const hash = bcrypt.hashSync(password, saltRounds);
  // const comparePass = bcrypt.compareSync(password, hash);

  //attach to database 
  const users = await User.findOne({
    where:{
      username: username, 
    }
  }); //referencing the model name from the models folder

  res.json(users)

    // console.log("my password: ", password);
  // console.log("my hashed password: ", hash);
  // console.log("is password correct: ", comparePass);
  // console.log("is wrong password correct: ", wrongComparePass);

  console.log(users)
});

module.exports = router;
