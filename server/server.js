const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
var steem = require("steem");

const app = express();
const port = 3001;

var ServerHelpers = require("./serverHelpers.js");
var serverHelpers = new ServerHelpers();

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  var userinfo;
  try {
    userInfo = await serverHelpers.logUserIn(username, password);
    res.json(userInfo);
  } catch (error) {
    console.log(error);
  }
});

app.get("/@", async (req, res) => {
  var userProfileInfo = await serverHelpers.getUserProfileInfo(
    req.query.username
  );
  res.json({ userProfileInfo });
});

app.get("/@:username/:permLink", async (req, res) => {
  var author = req.params.username;
  var permLink = req.params.permLink;
  //res.json({ author, permLink });

  var postInfo = await serverHelpers.getPostsDataFromSteem(permLink, author);
  res.json({ postInfo });

  /*
    steem.api
      .getContent(author, permLink, (err, result) => {
        //console.log(err, result);
      })
      .then(result => {
        res.json({ content: result });
      });*/
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
