var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds=process.env.SALT_ROUNDS;
const Sequelize = require("sequelize");
const { User } = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // res.send("respond with a resource");
  // const users = await User.findAll(); //referencing the model name from the models folder
  // console.log(users);
  // res.json(users);
  //render the file based on the view engine
  res.render("index");
});

router.post("/register", async (req, res, next) => {
  let { username, password, email } = req.body;
  const saltRounds = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, saltRounds);
  console.log(username, password, email);

  const newUser = await User.create({ //awaiting for the user input 
    username: username,
    password: hash,
    email: email,
  });

  res.json({
    id: newUser.id,
  });

  res.send("User add");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  

  const saltRounds = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, saltRounds);
  

  //attach to database
  const users = await User.findOne({
    where: {
      username: username,
    },
  }); //referencing the model name from the models folder


  console.log(users);

  const dbPassword = users.password; //coming from the database
  const comparePass = bcrypt.compareSync(password, dbPassword); //comparing hash password to db password 
//compare will return false ; bcrypt is running a comparison and is taking a plain text and hasing it and comparing it 

  if (comparePass) {
   res.render('NEXT EJS/HTML PAGE ')
    // res.json(users); //this will return all user data and send to JSON in the browser
    res.send("YOU ARE AUTHORIZED ")
    console.log("true - authorized user found");
  } else {
    console.log("no user found");
    res.send("Not authorized") //will appear in browser 
  }

  console.log(password);
  console.log(dbPassword);

  // console.log("my password: ", password);
  // console.log("my hashed password: ", hash);
  // console.log("is password correct: ", comparePass);
  // console.log("is wrong password correct: ", wrongComparePass);
});




module.exports = router;
