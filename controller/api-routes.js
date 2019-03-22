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
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });


app.get("/", function (req, res) {

    Article.find({},{}, function (err, data) {
        // Log any errors if the server encounters one
        if (err) {
            console.log(err);
        }
        else {
            articleArray ={}
            for(i in data){
                let articleDataArray = data[i].Title.split("   \n        \n        ")
                let Title = articleDataArray[0];
                let Description = articleDataArray[1];
                let Link = data[i].Link;
                let Saved = data[i].Saved
                let Id = data[i]._id
                let article = {
                    Id,
                    Title,
                    Description,
                    Link,
                    Saved,
                }
                articleArray[i] = article;
            }
            var hbsObject = {
                article: articleArray,
            };
            res.render("index", hbsObject);
        }
    });
});

app.put("/save/:id", function(req, res) {
    var condition = {Id: req.params.id};
    var update = req.body
    console.log(condition,update)
    Article.findOneAndUpdate(condition, update, (err, numAffected)=>{
        if(err){res.json(err)}
        else{
            res.redirect("/")
        }
    })
  });
  

app.put("/comment")

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
            Article.create({ Title: scrape.title, Link: scrape.link }).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            })
        });
    })
    res.json()
})

app.get("/search", (req, res) => {
    Article.find({ Title: "test" }).exec((err, data) => {
        if (err) { console.log(err) };
        console.log(data)
    })
})

module.exports = app;