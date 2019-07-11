require('./models/db');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');

const config = require('./config');
require('./passport')(passport);

//Create the app
const app = express();

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
                '==': function (l, r) {
                    return l == r;
                },
                '===': function (l, r) {
                    return l === r;
                },
                '!=': function (l, r) {
                    return l != r;
                },
                '<': function (l, r) {
                    return l < r;
                },
                '>': function (l, r) {
                    return l > r;
                },
                '<=': function (l, r) {
                    return l <= r;
                },
                '>=': function (l, r) {
                    return l >= r;
                },
                'typeof': function (l, r) {
                    return typeof l == r;
                }
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
/* app.use(bodyParser.json()); */
app.use(bodyParser.urlencoded({
    extended: false
}));

//Express Session
app.use(session({
    secret: 'vanilla cat',
    resave: true,
    saveUninitialized: true,
}));

//Express passport
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash 
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.listen(config.port, () => {
    console.log(`Success! Server is launched on port: ${config.port}.`);
});

//import controllers
app.use('/people', require('./controllers/people'));
app.use('/users', require('./controllers/users'));