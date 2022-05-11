const axios = require("axios");
const querystring = require("querystring");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("../server/db/db-connection.js");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
const PORT = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

CLIENT_ID = "cb79505b7a4e48258da5fc9f2d1672c2";
CLIENT_SECRET = "2b6b049411844eed80b871d782262f9c";
REDIRECT_URI = "http://localhost:8888/callback";

//creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.json({ message: "Hello from My ExpressJS" });
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
        });

        res.redirect(`http://localhost:3000/?${queryParams}`);

      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});
      

// const access_token =
//   "BQATShZxaFGyaOO1MekipXcTbCinLigdbjcOzaBuxxL3B97dISVMEsho219Z5bzjjUHi6Qp86K8E8WyULdEU7YpBSvy-yzBp-3tk1ZA2GlAm9yRt9Ps0vRe_q6Fq6wlEvttVDZxYVC9eRD2iEpprTERS4BjsNGgHFJk";
let artistid;

app.get("/game", async (req, res) => {
  genre = req.query.genre;
  console.log("backend line 315. Genre: " + genre);
  fetch(
    `https://api.spotify.com/v1/search?q=genre%3A${genre}&type=artist&market=ES&limit=10&offset=5`,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    }
  ).then((response) => {
    console.log(
      response.json().then((data) => {
        artistid = data.artists.items[0]["id"];
        {
          console.log("Artist ID:" + artistid);
        }
        res.json(data);
      })
    );
  });
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

