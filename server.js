const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err)
      console.log('Unable to write to server.log');
  });
  next();
});
// 
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello, express!</h1>');\
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to this very cool site'
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 500,
    errorMessage: 'There was an error'
  });
});

app.listen(3000)
