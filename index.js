const express = require('express') //pull something to my computer
const app = express()   // name it as app
const exphbs = require('express-handlebars');
const path = require("path");
const request = require("request");
const bodyParser=require("body-parser");

const PORT = process.env.PORT || 5000; //use theirs or use 5000


//API key pk_8ea99c28ba4444ab94f489185aeccca1 
// create a function that maps the output
function call_api(finishedAPI,stock_ticker){
    request(`https://cloud.iexapis.com/stable/stock/${stock_ticker}/quote?token=pk_8ea99c28ba4444ab94f489185aeccca1`,{json:true},(err,res,body)=>{
        if(err){return console.log(err);}
        if (res.statusCode===200){
            finishedAPI(body);
            };
    });
};


//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff="company-detail";

//Set handlebar index GET routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
            res.render('home',{  //pass variables
            stock:doneAPI
            });
    });
    
});

//call_api(function,req.body.stock_ticker)
//Set handlebar index POST routes
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        //posted_stuff=req.body.stock_ticker;
            res.render('home',{  //pass variables
            stock:doneAPI,
            });
    },req.body.stock_ticker);
    
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//Set static folder
app.use(express.static(path.join(__dirname,"public")));


app.listen(PORT,()=>console.log('Server Listening on port' + PORT))
