const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const Task = require('./models/tasks');

const app = express();

const dbURI = // 

mongoose.connect(dbURI)
        .then(result => app.listen(3000))
        .catch(err => console.log(err));


// middleware 
app.use(cors());
app.use(express.urlencoded( {extended: true })); // middleware to make parameters in request url usable
app.use(express.json());  // middleware to make body part of json passed in second parameter of fetch usable
app.use(morgan('dev'));

//routes
app.get('/tasks', (req, res) => {         
    Task.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/create', (req, res) => {
    task = new Task(req.body); // create a new task document

    // commit that document to database
    task.save()
        .then( (result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/task/:id', (req, res) => {
    const id = req.params.id;

    Task.findById(id)
        .then(result => {
            res.send(result);
        })
        .catch (err => {
            //res.statusCode(404).send(err);
            console.log(err);
        })
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Task.findByIdAndDelete(id)
        .then(result => {
            res.send({ output: "A Task Has Been Deleted"});
        })
        .catch(err => {
            console.log(err);
        });
});

app.patch('/changetask', (req, res) => {
    const id = req.body.id;
    const updatedTask = req.body.someTask;

    Task.findByIdAndUpdate(id, {task: updatedTask})
        .then(result => {
            res.send({ output: "Task has been Updated" });
        })
        .catch(err => {
            console.log(err);
        });
});

app.patch('/update/:id/:completion', (req, res) => {
    const id = req.params.id;
    const isCompleted = req.params.completion; // convert isCompleted from string to bool

    Task.findByIdAndUpdate(id, {completed: isCompleted})
        .then(result => { 
            res.send({ output: "A Task Has Been Completed?" });
        })
        .catch(erro => {
            console.log(erro);
        });
});