const express = require('express');
const bodyParser = require('body-parser');

const {db, pgp} = require('./db/postgres.js');
const toDo = require('./models/todo.js');
const user = require('./models/user.js');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    toDo.newToDo(req.body.todo)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    toDo.getAllToDos()
    .then(todos => {
        res.status(200).send({todos});
    })
    .catch(e => {
        res.status(400).send(e);
    })
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(Number.isInteger(+id)){
        toDo.getToDoById(id)
        .then((todo) => {
            res.status(200).send(todo);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send();
        });
    } else {
        res.status(404).send('Invalid ID');
    };
});

// app.get('/deleteToDos', (req, res) => {
//     toDo.deleteToDos()
//     .then(message => {
//         res.status(200).send(message);
//     })
//     .catch(e => {
//         res.status(400).send(e);
//     });
// });

app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {
    app
}

// toDo.newToDo('something new to do!');

// user.addUser('shadow44@gmail.com');
