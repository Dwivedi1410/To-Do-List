const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];
var workList = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine" , "ejs");


app.get("/" , function(req , res){

    var options = {weekday : "long" , year : "numeric" , month : "long" , day : "numeric"};
    var today = new Date();

    var currentDay = today.toLocaleDateString("en-US",options);
    
    res.render("list" , {list : currentDay , items : items});
});

app.post("/" ,function(req,res){
    var newItem = req.body.newListItem;
    if(req.body.btn === "Work List"){
        workList.push(newItem);
        res.redirect("/work");
    }
    else{
        items.push(newItem);
        res.redirect("/");
    }
})

app.get("/work" , function(req,res){
    res.render("list" , {list : "Work List" , items : workList})
})

app.listen("3000" , function(){
    console.log("server is started at port 3000");
})