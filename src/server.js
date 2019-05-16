const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();

const convert = require("xml-js");
// const xml = require("fs").readFileSync("./subidas/fileTEMP.xml", "utf8");
// const result = convert.xml2json(xml, { compact: true, spaces: 4 });
// console.log(result);

const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./subidas");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      file.fieldname + "TEMP" + path.extname(file.originalname)
    );
  }
});

// const convert = require("xml-js");
const xml = require("fs");
const result = {};

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/info", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  xml.readFileSync("./subidas/fileTEMP.xml", "utf8");
  result = convert.xml2json(xml, { compact: true, spaces: 2 });
  res.status(200).send(result);
  // return res.send("This is the homepage");
});

app.post("/subir", upload.single("file"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  // return res.send(req.file);
  return res.send(req.file);
});

app.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));
