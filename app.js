const express = require('express');
const router = express.Router();
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');
const passport = require('passport');
require("./config/passport")(passport)
const url = 'mongodb://localhost/test'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected...'))
.catch((err)=> console.log(err));

app.use("/static", express.static("public"));
app.set('view engine','ejs');

app.get('/login', (req,res)=>{
res.render('login.ejs');
});

app.get('/dashboard', (req,res)=>{
  res.render('dashboard.ejs');
  });

app.use(expressEjsLayout);

app.use(express.urlencoded({extended : false}));
app.use(session({
        secret : 'secret',
        resave : true,
        saveUninitialized : true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(3000); 