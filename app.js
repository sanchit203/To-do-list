//jshint version:6

const express = require('express');
const { renderFile } = require('ejs');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

const port = 3000

var items= ["Buy Food", "Cook food", "Eat food"];

var  workItems = [];

app.get('/', (req, res) => 
{
    var day = date.getDate();

    res.render("list", {listTitle: day, newitems: items})
});

app.post('/', function(req, res){
    var item = req.body.todoitem;
    var list = req.body.list;
    if(list=== "Work")
    {
        workItems.push(item);
        res.redirect('/work');
    }
    else{
    items.push(item);
    res.redirect('/')}
})

app.get('/work', function(req, res){
    res.render("list", {listTitle: "Work", newitems: workItems})
})


app.listen(port, () => 
{
    console.log(`Example app listening on port port!`)
});