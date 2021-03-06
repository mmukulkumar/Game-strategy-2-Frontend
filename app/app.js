
// Import express.js
const express = require("express");
const { Post } = require("./models/post");
const path = require('path')
// Create express app
var app = express();


// Add static files location
app.use(express.static("static"));
app.locals.moment = require('moment');

// Get the functions in the db.js file to use
const db = require('./services/db');

app.use('/views', express.static(path.resolve(__dirname, './views')))
app.set('view engine', 'pug');
app.set('views', './app/views');     
// Create a route for root - /
app.get("/", async function(req, res) {
    var post = new Post();
    const posts  = await post.getPosts();
    res.render("index",{posts});
});

app.get("/game", function(req, res) {
    res.render("game.pug");
});
app.get("/home", function(req, res) {
    res.render("index.pug");
});
app.get("/profile", function(req, res) {
    res.render("profile.pug");
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from games';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(process.env.NODE_LOCAL_PORT,function(){
    console.log(`Server running at http://127.0.0.1:${process.env.NODE_LOCAL_PORT}`);
});