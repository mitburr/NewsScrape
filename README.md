<h1>News Scraper</h1>


<h3>Description</h3>
<p> This app aims to scrape a webpage for news article titles, their description, and a link to the article. Then, the user should be able to "save" an article, and comment on the article. Comments should be visible to all users. </p>


<hr>


<h3>Technologies</h3>

<ul>
    <li>Web Scraping: Cheerio Package </li>
    <li>Html Library: Handlebars Package </li>
    <li>Server boilerplate: Express Package </li>
    <li>Database: Mongo </li>
    <li>Database "orm": Mongoose</li>
    <li>Project Paradigm: MVC</li>

</ul>


<hr>

<h3>Demonstration</h3>

<p>Currently the app is only able to scrape MPR's website for articles and display them with a connected hyperlink and description. Unfortunately I cannot demonstrate this. Even when my local database is empty the list of article populates. I believe this is a side effect of heroku deployment, but I'm unsure. You should be able to populate with additional articles at the time of testing because new articles will have been posted on MPR news.</p>


<hr>


<h3>Issues</h3>

<p>I was completely unable to get a PUT route to work. This means the save and comment uses are impossible to complete. The buttons on the webpage are able to make calls, which I will demonstrate, but I can't get any identifying data to pass. The only data which passes is booleans or undefined. </p>

<h5>For example, here I try to pass _id from the article document in addition to the changed save state, but it passes as a value of undefined for some reason, even though I'm able to render the id on the webpage succesfully.</h5>
![Passing ID broken](/public/assets/images/demonstrationGif.gif)


<hr>


<h3>Possible solutions</h3>

<p>I was able to pass the title variable. The title and description are passed together into the database as a single variable with a separator that I use to split the string. If I could get description to pass, I could rejoin the string and search by title. Unfortunately, I was only able to get description to pass as a boolean. Given the partial title, my next step would be to try and create a put request which searches the database by a partial string. This would be necessary anyway for my current formulation of the "comment" form, but ideally I could use ID for that as well.</p>

