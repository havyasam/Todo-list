//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose")

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser:true})

const itemSchema = new mongoose.Schema({
  name: String
});
const Item=mongoose.model("Item",itemSchema)

const Item1=new Item({
  name:"welcome to the tod do list"
})

const Item2=new Item({
  name:"hit like button"
})



const defaultItems=[Item1,Item2]



Item.insertMany(defaultItems)
.then(function(){
  console.log("successfully saved to itme to DB")
})
.catch(function(err){
  console.log(err)
})
  



app.get("/", function(req, res) {
  Item.find({}).then(function(foundItems){
    if(foundItems.length===0){
      Item.insertMnay(defaultItems,function(err){
        if(err){
          console.log(err)
        } 
        else
        {
          console.log("successfully saved default items to DB")
        }
      })
    res.redirect("/")
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  
})

 

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    item.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
