var express = require('express');
var router = express.Router();
var https = require('https');


var options = {
    hostname: "api.rss2json.com", 
    port: 443, 
    path: '',
    method: 'GET'
}

var path120 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-120-digital-sign.rss&api_key=' + process.env.API_KEY;
var path148 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-148-digital-sign.rss&api_key=' + process.env.API_KEY;
var path113 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-113-digital-sign.rss&api_key=' + process.env.API_KEY;
var path108 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-108-digital-sign.rss&api_key=' + process.env.API_KEY;


//RSS for room 120 http://25livepub.collegenet.com/calendars/012-120-digital-sign.rss
//RSS for room 148 http://25livepub.collegenet.com/calendars/012-148-digital-sign.rss
//RSS for room 113 http://25livepub.collegenet.com/calendars/012-113-digital-sign.rss
//RSS for room 108 http://25livepub.collegenet.com/calendars/012-108-digital-sign.rss

function rssStu120(sendResponseToBrowser){
    
    var apiResponse = '';
    var rssreq = https.get(options, function(response){
        
        rssreq.on('data', function(chunk){
            console.log("received data: "); 
            apiResponse += chunk; 
            
            
        });
        
        rssreq.on('end', function() {
            var feed = JSON.parse(apiResponse);
            
            sendResponseToBrowser(feed);
            
        });
        
        
    });
    
    rssreq.end();
}


function rssStu148(sendResponseToBrowser){
    
    options.path = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-148-digital-sign.rss&api_key=' + process.env.API_KEY;
    var apiResponse = '';
    var rssreq = https.get(options, function(response){
        
        rssreq.on('data', function(chunk){
            console.log("received data: "); 
            apiResponse += chunk; 
            
            
        });
        
        rssreq.on('end', function() {
            var feed = JSON.parse(apiResponse);
            
            sendResponseToBrowser(feed);
            
        });
        
        
    });
    
    rssreq.end();
}



function getrss(sendResponseToBrowser) {
    
    var completeResponse = ''; 
    
    // Set up the request
    var rssRequest = https.request(options, function(Response) {

      Response.on('data', function (chunk) {
          completeResponse += chunk; 
      });
      
      Response.on('end', function() {
            var responseJSON = JSON.parse(completeResponse); 
            
            sendResponseToBrowser(responseJSON); 
      }); 
    });
    
    rssRequest.end();
    
}


/* GET home page. */



router.get('/', function(req, res, next) {
    
    //Change path and call same function. Results in passing multiple identical variables for the calendar.
    options.path = path120;
    
    getrss(function(rm120data){
        
        options.path = path148;
        
        getrss(function(rm148data){
            
            options.path = path113;
            
            getrss(function(rm113data){

                options.path = path108;
                
                getrss(function(rm108data){
                    
                    res.render('index', {rm120: rm120data.items, rm148: rm148data.items, rm113: rm113data.items, rm108: rm108data.items});
                    
                });
                
            });
        });
        
    });
    
    
    
});



module.exports = router;


