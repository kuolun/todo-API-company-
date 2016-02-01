var express = require('express');
var app = express();
var todos = [{
    id: 1,
    description: "meet mom for lunch",
    completed: false
}, {
    id: 2,
    description: "go to school",
    completed: false
}, {
    id: 3,
    description: "play video game",
    completed: true
}];
//heroku
//如果沒有heroku的PORT就設定為3000
var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
    res.json(todos);
});

app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var todoMatched;

    todos.forEach(function (todo) {
        if (todoId === todo.id) {
            todoMatched = todo;
        }
    });
    if (todoMatched) {
        res.json(todoMatched);
    } else {
        res.status(400).send();
    }

});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
});
