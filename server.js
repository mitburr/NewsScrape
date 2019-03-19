// Using the tools and techniques you learned so far,
// you will scrape a website of your choice, then place the data
// in a MongoDB database. Be sure to make the database and collection
// before running this exercise.

// Consult the assignment files from earlier in class
// if you need a refresher on Cheerio.

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//initialize ports
var PORT = process.env.PORT || 8080;

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Hello world");
});

// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get("/all", function (req, res) {

  db.scrapedData.find({}, function (err, data) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    else {
      // Otherwise, send the result of this query to the browser
      res.json(data);
    }
  });
})
// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

app.get("/scrape", (req, res) => {

  // Make a request via axios to grab the HTML body from the site of your choice
  axios.get("https://www.mprnews.org/").then(function (response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("article.churn").each(function (i, element) {

      var title = $(element).children().text();
      var link = $(element).find("a").attr("href");

        
        db.scrapedData.fin
      // Save these results in an object that we'll push into the results array we defined earlier
      db.scrapedData.insert({
        title: title,
        link: link
      });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    return results;
  });
})

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port 3000!");
});
