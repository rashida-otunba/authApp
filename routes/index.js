var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
// Setting the auth token in cookies
// res.send('users')
res.cookie('token', "Test Cookie");
res.render("index");

});

// GET protected page
// //this is a middleware function
//User logs in before accessing protected route
//creates the JWT and saves as a cookie
// when user acesses a protected route
//use middleware to validate JWT
//if valid, render router or next ()
//else throw an error, redirect login
//middleware helper function example
const isValidUser = (req, res, next) => {
  // console.log("User JWT is valid");
  // next(); //next will pass the function along

  const userJWT = false;

  if ((userJWT === true)) {
    res.send("Welcome, authorized user!");
  } else {
    res.redirect("/users");
  }
};

router.get("/protected", isValidUser, (req, res, next) => {
  res.send("Authorized user, protected route ");
});




// // Setting the auth token in cookies
// res.cookie('token', authToken);



module.exports = router;
