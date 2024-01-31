const mongoose = require('mongoose');
const crayola = require('./crayola');
const Color = require('../models/color');

mongoose.connect('mongodb://localhost:27017/colorjr', { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR")
        console.log(err)
    });

//code to print out a seed
const seedDB = async() => {
    await Color.deleteMany({}); //delete user inputted data and revert to the starter code after exiting out of site
    for(let i = 0; i < 6; i++){
        const random6 = Math.floor(Math.random() * 6);
        const color = new Color({ //'new': create new object
            name: `${crayola[random6].name}`,
            hex: `${crayola[random6].hex}`
        });     
        await color.save();
    }
}

seedDB().then(() => { //if seedDB runs successfully and the starter data is there, close out the connection to allow app.js to run
    mongoose.connection.close(); //prevents conflicting databases
})
