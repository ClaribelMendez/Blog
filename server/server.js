const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 
const path = require('path');
const fetch = require('node-fetch')
const app = express();
const PORT = 4003;

app.use(cors());
app.use(express.json());

client_id = process.env.CLIENTID
client_secret = process.env.SECRET

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//create the get request
app.get('/genres', cors(), async (req, res) => {
   
    try{
        const { rows: genres } = await db.query('SELECT * FROM genres');
        res.json(genres);
    } catch (e){
        return res.status(400).json({e});
    }
});

const access_token =
  "BQD8G02twBmnuYCDgWKHJEh7ExKEs1YrUCDRySmhFxpYwAi3lFvf_VJb-H6x8L1rZYRWAxwseCC0q1abVC7bPQloW1HYpYzOkeQ6Eej4bu8zap8PauANGa7r3VrP1If1nhLycH4DIH9VqVLHqn9XwzS9rzaxyiap7gw";
let artistid;

app.get("/game", async (req, res) => {
  genre = req.query.genre;
  console.log("backend line 315. Genre: " + genre);
  fetch(`https://api.spotify.com/v1/search?q=genre%3A${genre}&type=artist&market=ES&limit=10&offset=5`, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  }).then((response) => {
    console.log(
      response.json().then((data) => {
        artistid = data.artists.items[0]['id']
        {console.log("Artist ID:" + artistid);}
        res.json(data)
      })
      )
})
})


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});