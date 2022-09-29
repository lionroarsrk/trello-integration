const express = require("express");
const app = express();
const port = 3006;
const routes = require("./routes/index.js");
const webroutes = require("./routes/webindex.js");
app.use(express.json());
app.use("/trello", routes);
app.use("/webhook", webroutes);
app.get("/", (_, res) => {
  res.status(200).send("Work fine");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
