require('./models/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');

const config = require('./config');

//Setup handlebars
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'template',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        compare: function (lvalue, rvalue, options) {

            if (arguments.length < 3)
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        
            var operator = options.hash.operator || "==";
        
            var operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            }
        
            if (!operators[operator])
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        
            var result = operators[operator](lvalue, rvalue);
        
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        
        },
    },
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
app.use('/people', require('./controllers/people'));
app.use('/users', require('./controllers/users'));