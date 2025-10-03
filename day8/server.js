const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const dataDiri = {
    nama: "Cundarojat",
    umur: 23,
    hobi: ["Baca Novel", "Tidur", "Gitu aja ehehee"],
  };

  res.render("index", dataDiri);
});

app.listen(3000, () => {
  console.log("jalan ga http://localhost:3000");
});
