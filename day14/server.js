const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");

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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "rahasia_cunda",
    resave: false,
    saveUninitialized: false, // ubah ke false
    cookie: { secure: false }, // penting saat testing di localhost
  })
);

app.use(flash());

//  LOGIN
app.get("/login", (req, res) => {
  const error = req.flash("error");
  res.render("login", { error });
});

app.post("/login", async (req, res) => {
  console.log("POST /login diterima, isi req.body:", req.body);
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("Hasil SELECT user:", result.rows);
    if (result.rows.length === 0) {
      req.flash("error", "Email tidak ditemukan");
      return res.redirect("/login");
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.flash("error", "Password salah");
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    console.log("Login berhasil:", req.session.user);
    res.redirect("/myproject");
  } catch (err) {
    console.error("Error login:", err);
    res.send("Terjadi kesalahan saat login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// Route
app.get("/", (req, res) => {
  res.redirect("/myproject");
});

// Route READ (tampilkan semua projet)
app.get("/myproject", checkAuth, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM myproject ORDER BY id DESC");
    res.render("myproject", {
      projects: result.rows,
      user: req.session.user,
    });
  } catch (err) {
    console.error("Error SELECT:", err);
    res.send("Error loading data from database");
  }
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

//  Route CREATE (tambah project)
app.post("/add-project", upload.single("image"), async (req, res) => {
  console.log("Data inputan diterima:", req.body);

  const { name, desc, start_date, end_date } = req.body;
  let { technologies } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null; // ambil path file

  if (!Array.isArray(technologies)) {
    technologies = [technologies];
  }

  try {
    await db.query(
      "INSERT INTO myproject (name, description, technologies, start_date, end_date, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, desc, technologies, start_date, end_date, image_url]
    );
    console.log("Data berhasil disimpan dengan gambar:", image_url);
    res.redirect("/myproject");
  } catch (err) {
    console.error("Error:", err);
    res.send("Gagal nambah project");
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

bcrypt.hash("12345", 10).then(console.log);
