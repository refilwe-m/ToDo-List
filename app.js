const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["Mentorship Session"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    var date= new Date();
    var day = date.getDay();
    var today = "";
    var options = {
        weekday: "long",
        day: "numeric",
        month:"long"};
   
    today = date.toLocaleDateString("en-US", options);
    
    res.render("list", {headerTitle:today, newListItems:items});
   
});

app.get("/work", function(req, res){
    res.render("list", {headerTitle:"Academic List", newListItems:workItems});
});

app.post("/work", function(req, res){
    workItems.push(req.body.newItem);
    res.redirect("/work");
});


app.post("/", function(req, res){

    if(req.body.list === "Academic"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
});


app.listen(5500, function(){
    console.log("Server connected successfully on port 5500");
});