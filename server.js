require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require("body-parser")

let urlShort

// function validURL(str) {
//   var pattern = new RegExp(/^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/); // fragment locator
//   return pattern.test(str);
// }

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", (req, res) => {
  const {url} = req.body
  const expression = /^(http|https)(:\/\/)/
  console.log(url)

  if(!(expression.test(url))){
    console.log("passed")
    return res.status(200).json({
      error: 'invalid url'
    })
  }

  urlShort = url

  return res.status(200).json({ 
    original_url : url, 
    short_url : 1
  })
})

app.get("/api/shorturl/1", (req, res) => {
  res.redirect(urlShort)
})

app.get("/api/shorturl/", (req, res) => {
  return res.status(500).json({
      error: 'invalid url'
  })
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
