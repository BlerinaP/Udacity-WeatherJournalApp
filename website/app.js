/*Global Variables*/
// assign api in baseURL variable
//Open Weather Api
const baseurl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const baseURL2 = ',us&units=imperial&appid=';
const apiKey = 'ba76cb352ea02977144418bd85937ea5';

//Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+d.getDate()+'.'+d.getFullYear();

//after clicking in button run performAction function
document.querySelector('#generate').addEventListener('click', performAction);

/**
 * Main function
 */

function performAction(e){
    //selecting input to take the zip code
    let zip = document.getElementById("zip").value;


    //Do the api request
    getData(baseurl+zip+baseURL2+apiKey)
        //then sending data to /Upload using function postData (created below this function)
        .then(
            //adding weather as parameter to hold information inside response
            function(weather) {
                let feelings = document.getElementById("feelings").value; //selecting textarea

                // then posting name, temperature, date, feelings inside the /upload path
                return postData('/upload', {name: weather.name, temperature: weather.main.temp, date: newDate, feelings: feelings})
            }
        )
        //Using getData function to get the data inside projectData which hold objects pushed by function above
        .then(
            function(response) {
                return getData('/get')
            }
        )
        //then updating UI with the data we get by the function above
        .then(
            function(get_response) {
                //console.log(get_response);
                document.getElementById('name').innerHTML = get_response.name;
                document.getElementById('date').innerHTML = get_response.date;
                document.getElementById('temp').innerHTML = get_response.temperature;
                document.getElementById('content').innerHTML = get_response.feelings;
            }
        )
}

/**
 * This function is used to take data from api and post them in server
 */
const postData = async (url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    }catch(err) {
        console.log(err);
    }
};

//Helper function
//This function is used to make the api call too
//This function gets data from the server
const getData = async (url = '')=>{
    const response = await fetch(url);

    try {
        const newData = await response.json(); // we assign response.json to the variable newData
        console.log(newData); // we make a console .log to see the response.json
        return newData; //than we return data from response.json
    }catch(error) {  // catch error
        console.log("error", error);
    }
};