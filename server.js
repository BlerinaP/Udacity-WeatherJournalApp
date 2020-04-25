/* Empty JS object to act as endpoint for all routes */
const projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 5050;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};


// GET route
app.get('/get', sendData);
function sendData (request, response) {
    console.log("sendData called")
    response.send(projectData);
};


app.post('/upload', addForecast);

function addForecast (request, response){
    const body = request.body;
    projectData.name = body.name;
    projectData.temperature = body.temperature;
    projectData.date = body.date;
    projectData.feelings = body.feelings;
    console.log(projectData);
    const jsonData = JSON.parse('{"response": "POST received"}');
    response.send(jsonData);
}