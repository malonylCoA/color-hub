const express = require('express');
const app = express(); //express
const path = require('path');
const mongoose = require('mongoose');
const Color = require('./models/color');

const methodOverride = require('method-override') 


mongoose.connect('mongodb://localhost:27017/colorjr', { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!") 
    })
    .catch(err => {
        console.log("OH NO MONGO CXN ERROR!!!!")
        console.log(err)
    })



app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs') //ejs

app.use(express.urlencoded({extended: true})) 
app.use(methodOverride('_method')) 

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/colors', async (req, res) => {
    const colors = await Color.find({});
    res.render('colors/index', {colors});
});

app.get('/colors/new', (req, res) => {
    res.render('colors/new');
});

app.post('/colors', async (req, res) => {
    const newColor = new Color(req.body);
    await newColor.save();
    res.redirect(`/colors/${newColor._id}`);
});

app.get('/colors/:id', async (req,res) => {
    const {id} = req.params;
    const c = await Color.findById(id);
    res.render('colors/show', {c});
});

app.get('/colors/:id/edit', async (req, res) => {
    const {id} = req.params;
    const c = await Color.findById(id);
    res.render('colors/edit', {c});
})

app.put('/colors/:id', async (req,res) => {
    const {id} = req.params;
    const c = await Color.findByIdAndUpdate(id, req.body);
    res.redirect(`/colors/${c.id}`);
})

app.delete('/colors/:id', async (req, res) => {
    const {id} = req.params;
    const deletedC = await Color.findByIdAndDelete(id);
    res.redirect('/colors');
})


app.listen(3000, () => { 
    console.log("app is listening on port 3000!") 
})
