var express = require('express');
var router = express.Router();
var https = require('https');


var options = {
    hostname: "api.rss2json.com", 
    port: 443, 
    path: '',
    method: 'GET'
}

var path120 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-120-digital-sign.rss&api_key=niuiqfkndfbaxykiumgi8qbsyjqsjxxlucgrffvd';
var path148 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-148-digital-sign.rss&api_key=niuiqfkndfbaxykiumgi8qbsyjqsjxxlucgrffvd';
var path113 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-113-digital-sign.rss&api_key=niuiqfkndfbaxykiumgi8qbsyjqsjxxlucgrffvd';
var path108 = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-108-digital-sign.rss&api_key=niuiqfkndfbaxykiumgi8qbsyjqsjxxlucgrffvd';


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
    
    options.path = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2F25livepub.collegenet.com%2Fcalendars%2F012-148-digital-sign.rss&api_key=niuiqfkndfbaxykiumgi8qbsyjqsjxxlucgrffvd'
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

/*
function myFunction() {

setInterval(function(){
    setTimeout(function(){ console.log("Change"); }, 3000);
    setTimeout(function(){ console.log("Change");  }, 6000);
    setTimeout(function(){ console.log("Change");  }, 9000);
    }, 12000);


    //setInterval(function(){ alert("Hello"); }, 3000);
}
*/

/* GET home page. */



router.get('/', function(req, res, next) {
    
    
    //myFunction();
    
    options.path = path120;
    
    getrss(function(rm120data){
        
        //console.log(rm120data);
        
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


// SetInterval function to cycle through rooms, sorta.



