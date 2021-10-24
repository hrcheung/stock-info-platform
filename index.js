const express = require('express') //pull something to my computer
const app = express()   // name it as app
const exphbs = require('express-handlebars');
const path = require("path");

const PORT = process.env.PORT || 5000; //use theirs or use 5000

//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes
app.get('/', function (req, res) {
    res.render('home');
});


//Set static folder
app.use(express.static(path.join(__dirname,"public")));


app.listen(PORT,()=>console.log('Server Listening on port' + PORT))
