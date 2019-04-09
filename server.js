const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));

app.get(/.*/, (req, res) => {
  res.sendfile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port);
console.log(`server started at ${port}`);
