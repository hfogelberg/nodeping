var websites = ['http://www.helenafogelberg.se'],
		dateformat = require('dateformat'),
		request = require('request'),
    monitors = [];

var recursive = function() {
	websites.forEach(function(website){
   ping(website);
	})
  setTimeout(recursive, 15 * 1000);
}

ping = function(website){
	request(website, function (error, res, body) {
	  if (!error && res.statusCode === 200) {
	      isOk(website);
	  }
	  else {
	      isNotOk(res.statusCode, website);
	  }
	})
};

isOk = function(website){
	log('UP', 'OK', website);
};

isNotOk = function (statusCode, website) {
    log('DOWN', statusCode, website);
};

log = function (status, msg, website) {
    var now = Date.now();
    var output = "\nWebsite: " + website;
    output += "\nTime: " + dateformat(now, 'isoDateTime');
    output += "\nStatus: " + status;
    output += "\nMessage:" + msg  + "\n";
    console.log(output);
};

recursive();

