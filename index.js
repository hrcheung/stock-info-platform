const express = require('express') //pull something to my computer
const app = express()   // name it as app
const exphbs = require('express-handlebars');
const path = require("path");
const request = require("request");
const bodyParser=require("body-parser");

const PORT = process.env.PORT || 5000; //use theirs or use 5000


// API key pk_8ea99c28ba4444ab94f489185aeccca1 
//create a function that maps the output
function call_api(finishedAPI,stock_ticker){  //use stock ticker to convey input
    //console.log(stock_ticker)
    request(`https://cloud.iexapis.com/stable/stock/${stock_ticker}/quote?token=pk_8ea99c28ba4444ab94f489185aeccca1`,{json:true},(err,res,body)=>{
        if(err){return console.log(err);}
        //console.log(res)
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
    },"fb");
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

//query historical 
function call_history(finishedAPI){  //use stock ticker to convey input
    //console.log(stock_ticker)
    request(`https://cloud.iexapis.com/stable/stock/aapl/chart/1m?token=pk_8ea99c28ba4444ab94f489185aeccca1`,{json:true},(err,res,body)=>{
        if(err){return console.log(err);}
        //console.log(res)
        if (res.statusCode===200){
            finishedAPI(body);
            };
    });
};


app.get('/historical', function (req, res) {
    call_history(function(doneAPI){
            res.render('historical',{  //pass variables
            stock_his:doneAPI
            });
    });
    
});

//Set handlebar historical POST routes
app.post('/historical', function (req, res) {
    call_history(function(doneAPI){
            res.render('historical',{  //pass variables
            stock_his:doneAPI,
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
