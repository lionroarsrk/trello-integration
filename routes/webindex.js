const express = require("express");
const router = express();
const WebHookControllers = require("../controllers/webhook.controllers");
router.use(express.static("public"));
router.get("/callback", WebHookControllers.getCallback);
router.get("/createWebhook", WebHookControllers.createWebhook);
router.post("/callback", WebHookControllers.createCallback);

module.exports = router;
