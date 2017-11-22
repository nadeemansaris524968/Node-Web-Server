const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view enginer', 'hbs');
app.use(express.static(__dirname + '/public')); // Built-in middleware to serve static public files

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + "\n");
    console.log(log);
    next();
});

// Middleware that stops showing any other files
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World!</h1>');
//     res.send({
//         name: 'Andrew',
//         likes: [
//             'Biking',
//             'Travelling'
//         ]
//     });
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome',
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});