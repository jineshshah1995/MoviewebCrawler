const express = require('express')
const _ = require('lodash');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

// File import
const crawler = require('./Crawler.js');

// Express
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.options('*', cors())
app.use(cors());

// Middleware used for checking file exists or not 

app.get('/getMovieDetails', createCrawlerMovieDataFile, (req , res) => {
 // sendResponse(req,res,JSON.parse(fs.readFileSync('./jsonCrawledOutput.json')).jsonCrawledOutput);
let x= JSON.parse(fs.readFileSync('./jsonCrawledOutput.json')).jsonCrawledOutput;
let movieYear = req.query.movieYear;
let movieName = req.query.movieName;
let movieCertificate = req.query.movieCertificate;
let movieDuration = req.query.movieDuration;
let movieGenre = req.query.movieGenre;
let movieImdb = req.query.movieImdb;
if (!_.isEmpty(movieYear))  x  = x.filter( movie => movie.movieYear === movieYear);
if(!_.isEmpty(movieName))  x = x.filter( movie => movie.movieName.toLowerCase() === movieName.toLowerCase());
if(!_.isEmpty(movieCertificate))  x = x.filter( movie => movie.movieCertificate.toLowerCase() === movieCertificate.toLowerCase());
if(!_.isEmpty(movieDuration))  x = x.filter( movie => movie.movieDuration === movieDuration);
if(!_.isEmpty(movieGenre))  x = x.filter(movie => movie.movieGenre.toLowerCase() === movieGenre.toLowerCase());
if(!_.isEmpty(movieImdb))  x = x.filter( movie => movie.movieImdb === movieImdb);
res.send(x)

})
function createCrawlerMovieDataFile(req,res,next){
// if file is exists then next method invovke and handle the resquest
if(!fs.existsSync('./jsonCrawledOutput.json')){
  console.log('Creating file...');
    crawler.getCrawlerData(200) // we can configure the movieList
    .then(data =>{
      console.log('File Created..');     
      next();
    });
} else { next();}
}

function sendResponse(req,res,x){
  // movieName":"The Shawshank Redemption","movieYear":"1994","movieCertificate":"A","movieDuration":"142 min","movieGenre":"Drama","movieImdb":"9.3"},{"movieName":"The Godfather","movieYear":"1972","movieCertificate":"A","movieDuration":"175 min","movieGenre":"Crime, Drama","movieImdb":"9.2"},{"movieName":"The Dark Knight","movieYear":"2008","movieCertificate":"UA","movieDuration":"152 min","movieGenre":"Action, Crime, Drama","movieImdb":"9.0"},{"movieName":"The Godfather: Part II","movieYear":"1974","movieCertificate":"A","movieDuration":"202 min","movieGenre":"Crime, Drama","movieImdb":"9.0"},{"movieName":"The Lord of the Rings: The Return of the King","movieYear":"2003","movieCertificate":"U","movieDuration":"201 min","movieGenre":"Action, Adventure, Drama","movieImdb":"8.9"},{"movieName":"Pulp Fiction","movieYear":"1994","movieCertificate":"A","movieDuration":"154 min","movieGenre":"Crime, Drama","movieImdb":"8.9"},{"movieName":"Schindler's List","movieYear":"1993","movieCertificate":"UA","movieDuration":"195 min","movieGenre":"Biography, Drama, History","movieImdb":"8.9"},{"movieName":"12 Angry Men","movieYear":"1957","movieCertificate":"","movieDuration":"96 min","movieGenre":"Crime, Drama","movieImdb":"8.9"},{"movieName":"Inception","movieYear":"2010","movieCertificate":"UA","movieDuration":"148 min","movieGenre":"Action, Adventure, Sci-Fi","movieImdb":"8.8"},{"movieName":"Fight Club","movieYear":"1999","movieCertificate":"A","movieDuration":"139 min","movieGenre":"Drama","movieImdb
  let movieYear = req.query.movieYear;
  let movieName = req.query.movieName;
  let movieCertificate = req.query.movieCertificate;
  let movieDuration = req.query.movieDuration;
  let movieGenre = req.query.movieGenre;
  let movieImdb = req.query.movieImdb;
  if (!_.isEmpty(movieYear))  x  = x.filter( movie => movie.movieYear === movieYear);
  if(!_.isEmpty(movieName))  x = x.filter( movie => movie.movieName === movieName);
  if(!_.isEmpty(movieCertificate))  x = x.filter( movie => movie.movieCertificate === movieCertificate);
  if(!_.isEmpty(movieDuration))  x = x.filter( movie => movie.movieDuration === movieDuration);
  if(!_.isEmpty(movieGenre))  x = x.filter( movie => movie.movieGenre === movieGenre);
  if(!_.isEmpty(movieImdb))  x = x.filter( movie => movie.movieImdb === movieImdb);
  res.send(x)

}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

