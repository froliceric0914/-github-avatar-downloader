var request = require('request');
var fs = require('fs');
var secret = require('./secret.js');

console.log('Welcome to the GitHub Avatar Downloader!');

var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {// var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  if(!repoOwner||!repoName){
    console.log('Invalid Input/\n Please input repoOwner repoName');
    return;
  }

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    body = JSON.parse(body);
    cb(err, body);
  });
}

function callback(err, result) {
  for(var url of result){
    var name = url.login;
    //instead of use result[url].login, we directly use url.login
    //because the result = [{loign1:...},{loign2:...},{loign3:...}],
    //the object[element] = undefine; only object[index] is valid;
    var path = './avatars/' + name +'.jpg';
    downloadImageByURL(url.avatar_url, path);
  }
  // console.log("Result:", urlAvatar)
  // console.log("Errors:", err);
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
        console.log('Response Status Code: ', response.statusCode, response.statusMessage);
        console.log('Downloading image...');
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function(){
        console.log('Download complete.');
      });
}

getRepoContributors(owner, repo, callback);
