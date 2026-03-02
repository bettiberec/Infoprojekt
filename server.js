const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Szerver működik. Ez egy próba. És ez is");
});

app.listen(3000, () => {
  console.log("Server fut: http://localhost:3000");
});