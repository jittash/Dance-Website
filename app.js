const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology: true });
const port = 8000;

//Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

var Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff

app.use('/static',express.static('static'));
app.use(express.urlencoded());

//Pug related stuff
app.set('view engine','pug');    //Set the template engine as pug
app.set('views',path.join(__dirname,'views'));   //Set the views directory



//Endpoints
/*app.get('/',(req,res)=>{
    res.render('index')
})*/

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.post('/contact',(req,res)=>{
    console.log(req.body);
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('Item saved in database')
    }).catch(()=>{
        res.status(400).send('Item not saved')
    });
})

//Start the server
app.listen(port,()=>{
    console.log(`Server running at http://127.0.0.1:${port}`)}
    );