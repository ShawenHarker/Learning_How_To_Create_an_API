console.log("server is starting!!!");

let express = require('express');

let app = express();

const Listening = () => {
    console.log("Listening.......");
}

var server = app.listen(3000, Listening);

app.use(express.static('public'));

/* 
The var "data" gets the value of the parameter that the user inputs in the search bar.
The function below allows me to input two values to my search bar to complete a route to my server. 
The first value is the name of the thing I want to search and the last is the amount of times I want to loop through it and have it printed out on the screen. 
*/
const loveDogs = (request, response) => {
    let data = request.params;
    let num = data.num;
    let reply = "";
    for (let i = 0; i < num; i++) {
        reply += `I love ${data.dogs} too!!!`;
    } 
    response.send(reply);
}

// The colon in front of the dog and num, indicate that it is a parameter and it can be anything the client types. 
app.get("/search/:dogs/:num", loveDogs)