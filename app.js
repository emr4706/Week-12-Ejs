const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const userName = "emr";
const userPassword = "123"

const app = express();
const port = 3000

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


app.get('/list', (req, res) => {

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

app.get('/', (req, res) => {
  res.render('login', {isError: false}); 
})

app.post('/login', (req, res) => {

   let {username, password} = req.body;

   if(username === userName && password === userPassword) {

      return res.redirect('/list');
   }

   res.render('login', {isError: true});
})




let todoList = ["Doe Boodschappen", "Eet Afmaken", "Doe Afwassen"];


app.post('/add-todo', (req, res) => {
  
  let newTodo = req.body.newTodo;
  todoList.push(newTodo);

  res.redirect('list');

})


app.listen(port, () => console.log(`Server running on port ${port}!`))