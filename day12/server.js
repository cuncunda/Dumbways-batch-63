const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = 3000;

//  Konfig konek PostgreSQL
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dumbways2-db",
  password: "cimuncang78",
  port: 5432,
});

//  Tes koneksi
db.connect((err, client, release) => {
  if (err) {
    return console.error("error", err.stack);
  }
  console.log("PostgreSQL! jalan");
  release();
});

//  Setup view engine dan folder public
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.redirect("/myproject");
});

// Route READ (tampilkan semua projet)
app.get("/myproject", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM myproject ORDER BY id DESC");
    res.render("myproject", { projects: result.rows });
  } catch (err) {
    console.error("Error SELECT:", err);
    res.send("Error loading data from database");
  }
});

//  Route CREATE (tambah project)
app.post("/add-project", async (req, res) => {
  console.log("Data inputan diterima:", req.body); // tess

  const { name, desc, start_date, end_date, image_url } = req.body;
  let { technologies } = req.body;

  // Handle checkbox
  if (!Array.isArray(technologies)) {
    technologies = [technologies];
  }

  try {
    await db.query(
      "INSERT INTO myproject (name, description, technologies, start_date, end_date, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, desc, technologies, start_date, end_date, image_url]
    );
    console.log("Data berhasil disimpan");
    res.redirect("/myproject");
  } catch (err) {
    console.error("Error", err);
    res.send("gagal nambah project");
  }
});

const hbs = require("hbs");

hbs.registerHelper("formatDate", function (date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
});

hbs.registerHelper("json", function (context) {
  return JSON.stringify(context, null, 2);
});

// server jalan ga
app.listen(port, () => {
  console.log(`jalan yu jalan http://localhost:${port}`);
});
