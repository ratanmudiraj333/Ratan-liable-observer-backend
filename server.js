const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const lo = require('./models/loschema');
require('dotenv').config(); 

//Execute express 
const app = express(); 

//Middlewares
app.use(express.json()); 
app.use(cors()); 

const port = process.env.PORT; 

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Connected to the database…')) 
        .catch((err) => console.error('Connection error:', err));

//Routes 
app.get('/lo', async (req, res) => { 
    const allObservations = await lo.find();
    res.json(allObservations)
  });
 
 app.post('/lo/new', async (req,res) => {
     const newObservation = await lo.create(req.body);
     res.status(200).json({newObservation})
 })
 
 app.delete('/lo/delete/:id', async(req,res)=>{
     const deleteObservation = await lo.findByIdAndDelete(req.params.id)
     res.json(deleteObservation)
 }) 

 app.post("/lo/new/:id", async(req, res) => { 
    const id = req.params.id; 
    const updateObservation = { 
        status: req.body.status, 
    }; 
    lo.findByIdAndUpdate(id, updateObservation) 
        .then((observation) => res.json(observation)) 
        .catch((err) => res.json(err)); 
});

app.listen(port, () => console.log(`Machine is running on port ${port}`)); 


//MONGO_URI= mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority