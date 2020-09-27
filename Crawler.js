const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { resolve } = require('path');
const { reject } = require('lodash');

// let URL = "https://www.imdb.com/search/title/?count=10&groups=top_1000&sort=user_rating";

let jsonCrawledOutput =[];
function getCrawlerData(recordCount) {
    
    return new Promise((resolve,reject) => {
        let URL = `https://www.imdb.com/search/title/?count=${recordCount}&groups=top_1000&sort=user_rating`
        console.log('Inside File Creation..');
        request(URL, async function  (err, res, body) {
        if(err)
        {
            reject(err);
            console.log(err, "error occured while hitting URL");
        }
        else
        {
            let $ = cheerio.load(body);
            $('div.lister-list > div.lister-item.mode-advanced').each( async function(index){
              
              jsonCrawledOutput.push({
                    movieName : $(this).find('div.lister-item-content>h3>a').text().trim(),
                    movieYear : $(this).find('div.lister-item-content>h3>span.lister-item-year.text-muted.unbold').text().trim().substring(1,5),
                    movieCertificate : $(this).find('p > span.certificate').text().trim(),
                    movieDuration : $(this).find('p > span.runtime').text().trim(),
                    movieGenre : $(this).find('p > span.genre').text().trim(),
                    movieImdb : $(this).find('div.ratings-bar> div.ratings-imdb-rating > strong').text().trim()
              });  // json object ends
            });// loop ends
         //   return jsonCrawledOutput;
            fs.writeFileSync('jsonCrawledOutput.json',JSON.stringify( { jsonCrawledOutput}));
            resolve(jsonCrawledOutput);
        }
    });
    });
}

module.exports = { getCrawlerData }