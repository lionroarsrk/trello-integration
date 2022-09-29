const express = require("express");
const router = express();
const CrudControllers = require("../controllers/crud.controllers");
const WebHookControllers = require("../controllers/webhook.controllers");
router.use(express.static("public"));

router.get("/", CrudControllers.simpleCall);
router.get("/login", CrudControllers.loginCall);
router.get("/callback", CrudControllers.callbackCall);

//crud operations routes
router.get("/labels/:boardId", CrudControllers.getAllLabels);
router.get("/lists/:boardId", CrudControllers.getAllListOnBoards);
router.get("/members/:boardId", CrudControllers.getAllMembers);
router.get("/cards/:boardId", CrudControllers.getAllCards);
router.get("/boards/:username", CrudControllers.getAllBoards);
router.get("/updateStatus/", CrudControllers.updateCardList);
router.get("/updateLabel/", CrudControllers.updateCardLabels);
router.get("/createCard/", CrudControllers.createCards);

module.exports = router;
