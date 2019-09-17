const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {

  var today = new Date();
  let options = {
      weekday: "long",
      day: "numeric",
      month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
      kindOfDay: day, todos: todoList
  });
});

let todoList = ["Doe Boodschappen", "Eet Afmaken", "Doe Afwassen"];

// app.get('/', (req, res) => {
  
//   res.render("list", {todos: todoList});
  
// });

app.post('/', (req, res) => {
  
  let newTodo = req.body.newTodo;
  todoList.push(newTodo);

  res.redirect('/');

})


app.listen(port, () => console.log(`Server running on port ${port}!`))