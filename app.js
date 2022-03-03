var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
//get config vars; config method is expecting a env
dotenv.config();
const secretKey = process.env.SECRET_KEY;

console.log("Salt rounds are:", process.env.SALT_ROUNDS);
//example of a key
console.log("SECRET KEY IS", secretKey);

//adds the token from the jwt jsonwebtoken
const token = jwt.sign(
  {
    data: "Free the ducks",
  },
  secretKey,
  { expiresIn: "1h" }
);

jwt.verify(
  token,
  secretKey,
  function(err,decoded){
    console.log("Decoded", decoded) //will show the decoded console.log 
  }
);

console.log("supersecret token is: ", token);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
