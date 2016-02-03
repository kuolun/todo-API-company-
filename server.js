var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());


//heroku
//如果沒有heroku的PORT就設定為3000
var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
    res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);

    //refactor with underscore
    var todoMatched = _.findWhere(todos, {
        id: todoId
    });


    // todos.forEach(function (todo) {
    //     if (todoId === todo.id) {
    //         todoMatched = todo;
    //     }
    // });
    if (todoMatched) {
        res.json(todoMatched);
    } else {
        res.status(400).send();
    }

});


//POST /todos
app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');

    //check input
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }

    body.description = body.description.trim();


    //add id field
    body.id = todoNextId++;

    //push body into array
    todos.push(body);

    res.json(body);
});

//DETELE /todos/:id
app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {
        id: todoId
    });

    if (!matchedTodo) {
        res.status(404).json({
            "error": "no todo found with id"
        });
    } else {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    }
});


app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
});
