let fs = require('fs');
let data = fs.readFileSync('wordScore.json');
let wordScore = JSON.parse(data);

console.log("server is starting!!!");

let express = require('express');

let app = express();

const Listening = () => {
    console.log("Listening.......");
}

var server = app.listen(3000, Listening);

app.use(express.static('public'));

const addWord = (request, response) => {
    let data = request.params;
    let word = data.word;
    let score = Number(data.score);
    let reply;
    if (!score) {
        let reply = {
            status: `Score is required!!!`
        }
        response.send(reply);
    }else {
        wordScore[word] = score;
        let data = JSON.stringify(wordScore, null, 2);

        const wordAdded = () => {
            console.log(`You all set...`);
            let reply = {
                wordAdd: word,
                score: score,
                status: `Word and score successfully added.`
            }
            response.send(reply);
        }
        fs.writeFile('wordScore.json', data, wordAdded);
    } 
}

// The colon in front of the dog and num, indicate that it is a parameter and it can be anything the client types.
// The ? means that the last parameter is optional. 
app.get("/add/:word/:score?", addWord)

const allWords = (request, response) => {
    response.send(wordScore);
}

app.get("/wordScore", allWords)

const searchWord = (request, response) => {
    let word = request.params.word;
    let reply;
    if (wordScore[word]) {
        reply = {
            status: "found",
            word: word,
            score: wordScore[word]
        }
    }else {
        reply = {
            status: "not found",
            word: word
        }
    }
    response.send(reply);
}

app.get("/search/:word", searchWord)