// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose")
// Require axios and cheerio. This makes the scraping possible


// Initialize Express
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//initialize ports
var PORT = process.env.PORT || 8080;

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var routes = require('./controller/api-routes');
app.use(routes);

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
})
