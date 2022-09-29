var config = require("dotenv").config();
var trelloNode = require("trello-node-api")(
  process.env.API_KEY,
  process.env.API_TOKEN
);
var createWebhook = (req, res) => {
  var data = {
    description: "This is a webhook",
    callbackURL: " https://4904-60-254-0-195.in.ngrok.io/webhook/callback", // REQUIRED
    idModel: "6193a7284cbaaa6ff4a16edd", // REQUIRED
    active: false,
  };
  trelloNode.webhook
    .create(data)
    .then(function (response) {
      console.log("response ", response);
      res.send(JSON.stringify(response));
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

var createCallback = (request, response) => {
  console.log(`post '/callback' 🤠 ${Date()}`);
  response.set("content-type", "application/json");
  response.append("Access-Control-Allow_Origin", "*");
  console.log(request.body.action);
  response.status(200).send(request.body.action);
};

var getCallback = (request, response) => {
  response.status(200).send("start Webhook");
};

module.exports = {
  createWebhook,
  createCallback,
  getCallback,
};
