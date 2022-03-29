const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

const newItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res) {

  const day = date.getDate();
  res.render('list', {listTitle: day, newListItem: newItems});

});

app.post("/",function(req, res){
  const newItem = req.body.newItem;
  if (req.body.submit === "Work List") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    newItems.push(newItem);
    res.redirect("/");
  }

})

app.get("/work", function(req,res) {
  res.render('list', {listTitle: 'Work List', newListItem: workItems})
})

app.listen(3000, function() {
  console.log("Server running on port 3000.");
})
