const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require("cors");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.use(cors());

app.post("/addQuote", (req, res) => {
  const newQuote = req.body;
  db.collection("quotes")
      .doc()
      .set(newQuote)
      .then((resp) => res.status(200).send({msg: "quote added"}))
      .catch((error) => res.status(500).send({msg: "error adding quote"}));
});

app.post("/deleteQuote", (req, res) => {
  const data = req.body;
  const idQuote = data.idQuote;
  db.collection("quotes")
      .doc(idQuote)
      .delete()
      .then((resp) => res.status(200).send({msg: "quote deleted"}))
      .catch((error) => res.status(500).send({msg: "error deleting quote"}));
});

app.post("/updateQuote", (req, res) => {
  const data = req.body;
  const {idQuote, newValue} = data;

  db.collection("quotes")
      .doc(idQuote)
      .update({quote: newValue})
      .then((resp) => res.status(200).send({msg: "quote updated"}))
      .catch((error) => res.status(500).send({msg: "error updating quote"}));
});

exports.api = functions.https.onRequest(app);
