const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;
const weatherApp = require("./app");

const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));

app.get("/homepage", (req, res) => {
  res.sendFile(publicDirectory + "/index.html");
});

app.get("/weather", (req, res) =>
  weatherApp(req.query.place).then((response) => res.json(response))
);

app.listen(PORT, () => console.log("Listening to the port 8080"));
