//modules
var OAuth = require("oauth").OAuth;
var url = require("url");
var Trello = require("trello");
var config = require("dotenv").config();
var trello = new Trello(process.env.API_KEY, process.env.API_TOKEN);

//constant
const requestURL = process.env.REQUEST_URL;
const accessURL = process.env.ACCESS_URL;
const authorizeURL = process.env.AUTHORIZE_URL;
const appName = process.env.APP_NAME;
const scope = process.env.SCOPE;
const expiration = process.env.EXPIRATION;
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const loginCallback = process.env.LOGIN_CALLBACK;

//auth code
const oauth_secrets = {};

const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);
const login = function (request, response) {
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    oauth_secrets[token] = tokenSecret;
    response.redirect(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`
    );
  });
};

var token, tokenSecret;
var callback = function (req, res) {
  const query = url.parse(req.url, true).query;
  token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(
    token,
    tokenSecret,
    verifier,
    function (error, accessToken, accessTokenSecret, results) {
      oauth.getProtectedResource(
        "https://api.trello.com/1/members/me",
        "GET",
        accessToken,
        accessTokenSecret,
        function (error, data, response) {
          res.send(data);
        }
      );
    }
  );
};

//routes callback
var simpleCall = (req, res) => {
  console.log(`GET '/' 🤠 ${Date()}`);
  res.send("<h1>Oh, hello there!</h1><a href='./login'>Login with OAuth!</a>");
};
var loginCall = (req, res) => {
  console.log(`GET '/login' 🤠 ${Date()}`);
  login(req, res);
};
var callbackCall = (req, res) => {
  console.log(`GET '/callback' 🤠 ${Date()}`);
  callback(req, res);
};

//crud
const getAllListOnBoards = (req, res) => {
  const boardId = req.params.boardId;
  var boardsPromise = trello.getListsOnBoard(boardId);
  boardsPromise.then((lists) => {
    res.status(200).send(JSON.stringify(lists));
  });
};

const getAllLabels = (req, res) => {
  const boardId = req.params.boardId;
  var labelsPromise = trello.getLabelsForBoard(boardId);
  labelsPromise.then((label) => {
    const data = {
      data: label,
    };
    res.status(200).send(JSON.stringify(data));
  });
};

const getAllMembers = (req, res) => {
  const boardId = req.params.boardId;
  var memberPromise = trello.getBoardMembers(boardId);
  memberPromise.then((members) => {
    const data = {
      data: members,
    };
    res.status(200).send(JSON.stringify(data));
  });
};

const getAllCards = (req, res) => {
  const boardId = req.params.boardId;
  var cardPromise = trello.getCardsOnBoard(boardId);
  cardPromise.then((cards) => {
    const data = {
      data: cards,
    };
    res.status(200).send(JSON.stringify(data));
  });
};

const getAllBoards = (req, res) => {
  const username = req.params.username;
  var boardPromise = trello.getBoards(username);
  boardPromise.then((board) => {
    const data = {
      data: board,
    };
    res.status(200).send(JSON.stringify(data));
  });
};

//create and update
const updateCardList = (req, res) => {
  var updateCardStatus = trello.updateCard(
    "630797542b9c27009c7768ea", //card id
    "idList", // update status
    "629dab211bb5081da0123b59" // status/list id
  );
  updateCardStatus.then((board) => {
    const data = {
      data: board,
    };
    res.status(200).send(JSON.stringify(data));
  });
};

const updateCardLabels = (req, res) => {
  const labelId = ["6193a72833ccc35e921d0e8e"];
  var updateCardLabel = trello.updateCard(
    "630797542b9c27009c7768ea", // card id
    "idLabels", // update label name
    labelId // label ids
  );
  updateCardLabel.then((board) => {
    const data = {
      data: board,
    };
    res.status(200).send(JSON.stringify(data));
  });
};

const createCards = (req, res) => {
  const extraParams = { idLabels: ["6193a72833ccc35e921d0e8e"] };
  var cardPromise = trello.addCardWithExtraParams(
    "new card", //title
    extraParams, //extra parameters
    "61a4faaa6216ca88ab4687ab" //list id
  );
  cardPromise.then((board) => {
    const data = {
      data: board,
    };
    res.status(200).send(JSON.stringify(data));
  });
};
//end

module.exports = {
  simpleCall,
  loginCall,
  callbackCall,
  getAllListOnBoards,
  getAllLabels,
  getAllMembers,
  getAllCards,
  getAllBoards,
  updateCardList,
  updateCardLabels,
  createCards,
};
