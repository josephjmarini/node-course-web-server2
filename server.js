const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

// setup
app.set('view engine', 'hbs');

// provide middleware functionality


//       request response next to inform express we are done
//       the function runs for each request
//       could add information tracking performance
//
app.use( (req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: method: ${req.method} path: ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });

    // need this call to continue execution
    next();
});
 
// only activate in maintenance mode
//
// app.use( (req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance Page',
//         welcomeMessage: 'Currently under maintenance'
//     });
// });

app.use(express.static(__dirname + '/public'));

// http handlers
hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
});

// http request and response

// root route
app.get('/', (req, res) => {
    //res.send('<h1>hellow express!</h1>');

    //
    // using handle bar templating respond sending an object express converts it JSON
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Home Page2'
    });
});

// about route
app.get('/about',(req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Title Page'
    });

});

// about route
app.get('/project',(req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Title Page'
    });

});

// bad route
app.get('/bad',(req, res) => {
    res.send({
        errorMessage: "bad request"
    });

});

// listen on a port
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);

});