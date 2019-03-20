//dependency
var express = require('express')
var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs")
var Article = require("../models/article")
var mongoose = require("mongoose");

//setup router access
var app = express.Router();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);

// db.on("error", function (error) {
//     console.log("Database Error:", error);
// });

app.get("/", function (req, res) {
    res.send("Hello world");
});

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


app.get("/scrape", (req, res) => {

    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get("https://www.mprnews.org/").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape

        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("article.churn").each(function (i, element) {
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");
            // Save these results in an object that we'll push into the results array we defined earlier
            scrape = {
                title,
                link
            }
            Article.create({Title: scrape.title, Link: scrape.link }).then(function(data){
                console.log(data);
            }).catch(function(err){
                console.log(err);
            })
        });
    })
    res.json()
})

app.get("/search", (req,res) => {
    Article.find({Title: "test"}).exec((err,data) => {
        if(err){console.log(err)};
        console.log(data)
    })
})

module.exports = app;