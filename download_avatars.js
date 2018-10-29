var request = require('request');

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
  console.log("Result:", urlAvatar)
  console.log("Errors:", err);
  // console.log("Result:", result);
});