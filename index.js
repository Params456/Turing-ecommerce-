var express = require("express");
var app = express();
var morgan = require("morgan");
var cookieParser = require('cookie-parser');
var wrong = require("./404.js");
var allRoutes = require("./Router/allRouter");

app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser());
app.use(allRoutes);

app.use(wrong.notFound)
app.use(wrong.Internal)

var port = 8000;
app.listen(port);
console.log(`Server started at http://localhost:${port}`)