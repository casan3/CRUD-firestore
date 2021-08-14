const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require("cors");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.use(cors());

app.post("/addQuote", (req, res) => {
  const params = req.body;
  console.log(params);
  db.collection("quotes").doc().set(params);
  res.status(200).send({msg: "quote added"});
});

exports.api = functions.https.onRequest(app);
