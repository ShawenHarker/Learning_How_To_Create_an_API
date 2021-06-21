console.log("server is starting!!!");

let express = require('express');

let app = express();

const Listening = () => {
    console.log("Listening.......");
}

var server = app.listen(3000, Listening);

app.use(express.static('public'));

const loveDogs = (request, response) => {
    response.send("I love dogs so much!!!");
}

app.get("/lovedogs", loveDogs)