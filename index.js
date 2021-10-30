const express = require('express') //pull something to my computer
const app = express()   // name it as app
const exphbs = require('express-handlebars');
const path = require("path");
const request = require("request");

const PORT = process.env.PORT || 5000; //use theirs or use 5000


//API key pk_8ea99c28ba4444ab94f489185aeccca1 
// create a function that maps the output
function call_api(finishedAPI){
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_8ea99c28ba4444ab94f489185aeccca1',{json:true},(err,res,body)=>{
        if(err){return console.log(err);}
        if (res.statusCode===200){
            finishedAPI(body);
            };

    });
};




//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff="company-detail";

//Set handlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
            res.render('home',{  //pass variables
            stock:doneAPI
            });
    });
    
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//Set static folder
app.use(express.static(path.join(__dirname,"public")));


app.listen(PORT,()=>console.log('Server Listening on port' + PORT))
