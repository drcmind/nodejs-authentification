require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { cours, utilisateurs } = require("./data");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.engine("html", ejs.__express);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

const protectionRoute = (req, res, next) => {
  const token = req.query.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, utilisateur) => {
      if (err) {
        return res.redirect("/connexion");
      }
      utilisateur.token = token;
      req.utilisateur = utilisateur;
      next();
    });
  } else {
    return res.redirect("/connexion");
  }
};

const protectionLandPage = (req, res, next) => {
  const token = req.query.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, utilisateur) => {
      if (err) {
        req.utilisateur = undefined;
      }
      utilisateur.token = token;
      req.utilisateur = utilisateur;
    });
  }
  next();
};

app.get("/accueil", protectionLandPage, (req, res) => {
  let utilisateur = req.utilisateur;
  res.render("index", { cours, utilisateur });
});
app.get("/connexion", async (req, res) => {
  res.render("connexion");
});
app.post("/connexion", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const utilisateur = utilisateurs
      .flat()
      .find((utilisateur) => utilisateur.email === email);
    if (utilisateur) {
      const validPassWord = await bcrypt.compare(
        password,
        utilisateur.password
      );
      if (validPassWord) {
        const token = jwt.sign(
          { idUtilisateur: utilisateur.id, nom: utilisateur.nom, email },
          process.env.TOKEN_KEY
        );
        utilisateur.token = token;
        return res.render("index", { cours, utilisateur });
      } else {
        console.log("Mot de passe incorrect");
      }
    } else {
      console.log("Utilisateur n'existe pas");
    }
  }
  res.redirect("/connexion");
});
app.get("/inscription", (req, res) => {
  res.render("inscription");
});

app.post("/inscription", async (req, res) => {
  const { nom, email, password } = req.body;
  console.log(nom, email, password);
  if (nom && email && password) {
    const utilisateur = utilisateurs.some(
      (utilisateur) => utilisateur.email === email
    );
    if (!utilisateur) {
      const salt = await bcrypt.genSalt(10);
      const passwordToSave = await bcrypt.hash(password, salt);

      let nouvelUtilisateur = {
        id: utilisateurs.length + 1,
        nom,
        email,
        password: passwordToSave,
      };

      utilisateurs.push(nouvelUtilisateur);

      const token = jwt.sign(
        { idUtilisateur: nouvelUtilisateur.id, email },
        process.env.TOKEN_KEY
      );
      nouvelUtilisateur.token = token;

      return res.render("index", { cours, utilisateur: nouvelUtilisateur });
    }
  }
  res.redirect("/inscription");
});

app.get("/lectureVideo", protectionRoute, (req, res) => {
  const utilisateur = req.utilisateur;
  if (!utilisateur) {
    return res.redirect("/connexion");
  }
  res.render("lectureVideo", { utilisateur });
});

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Require Range header");
  }
  const videoPath = "public/videos/drcmind_intro.mp4";
  const videoSize = fs.statSync("public/videos/drcmind_intro.mp4").size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": "bytes " + start + "-" + end + "/" + videoSize,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.get("/deconnexion", (req, res) => {
  res.render("index", { cours, utilisateur: undefined });
});

app.listen(4001);
console.log("L'application tourne au port 4001");
