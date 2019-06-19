require('./models/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');

const config = require('./config');

//import controllers
const peopleController = require('./controllers/peopleController');

//Setup handlebars
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'template',
    layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Setup the app
app.use(express.static(path.join(__dirname, '/views/')));
app.use(express.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log(`Success! Server is launched on port: ${config.port}.`);
});

//import controllers
app.use('/people', peopleController);