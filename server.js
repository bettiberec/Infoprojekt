const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Szerver működik ");
});

app.listen(3000, () => {
  console.log("Server fut: http://localhost:3000");
});