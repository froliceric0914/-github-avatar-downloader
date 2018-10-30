var request = require('request');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    body = JSON.parse(body);
    cb(err, body);
  });


}

getRepoContributors("jquery", "jquery", function(err, result) {
  let urlAvatar = result.map(element => {
    return element.avatar_url;
  })
  for(var url of urlAvatar){
    console.log(urlAvatar)
    downloadImageByURL(url, './avatar');
  }
  console.log("Result:", urlAvatar)
  console.log("Errors:", err);
  // console.log("Result:", result);
});

//in callback function, do the iterate
// in the dowaload function, do the download

function downloadImageByURL(url, filePath) {
   // const uploadDir = './avatar'
  // let path = `${filePath}/${url}`;
  request.get(`${url}`)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
        console.log('Response Status Code: ', response.statusCode, response.statusMessage); //the response consist of the body and header, header is invisible

        console.log('Downloading image...');
       })
       .pipe(fs.createWriteStream(`${filePath}/${url}`)) //write the file to local
       .on('finish', function(){
        console.log('Download complete.');
      });

}
