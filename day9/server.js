const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const port = 3000;

// Setup view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Setup folder
app.use(express.static(path.join(__dirname, "public")));

// Rout hal
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/myproject", (req, res) => {
  res.render("myproject");
});

app.get("/detail-project", (req, res) => {
  const id = req.query.id;
  res.render("detail-project", { projectId: id });
});

app.listen(port, () => {
  console.log(`jalan yu janal http://localhost:${port}`);
});
