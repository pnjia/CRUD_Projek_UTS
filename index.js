const express = require("express");
const app = express();
const port = 3000;
const { db } = require("./modules/db.js");

app.use(express.json());

app.get("/ligabelanda", (req, res) => {
  db.query("SELECT * FROM ligabelanda", (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.length === 0) {
      return res.status(404).send("Data masih kosong!");
    } else {
      res.send(result);
    }
  });
});

app.get("/ligainggris", (req, res) => {
  db.query("SELECT * FROM ligainggris", (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.length === 0) {
      return res.status(404).send("Data masih kosong!");
    } else {
      res.send(result);
    }
  });
});

app.get("/ligajerman", (req, res) => {
  db.query("SELECT * FROM ligajerman", (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.length === 0) {
      return res.status(404).send("Data masih kosong!");
    } else {
      res.send(result);
    }
  });
});

app.get("/ligaprancis", (req, res) => {
  db.query("SELECT * FROM ligaprancis", (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.length === 0) {
      return res.status(404).send("Data masih kosong!");
    } else {
      res.send(result);
    }
  });
});

app.get("/ligaspanyol", (req, res) => {
  db.query("SELECT * FROM ligaspanyol", (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.length === 0) {
      return res.status(404).send("Data masih kosong!");
    } else {
      res.send(result);
    }
  });
});

app.post("/pemain/:liga", (req, res) => {
  const liga = req.params.liga;
  const { nama, umur, posisi, NA, KA, KSI, harga } = req.body;

  const sql = `INSERT INTO ${liga} (nama, umur, posisi, NA, KA, KSI, harga) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nama, umur, posisi, NA, KA, KSI, harga], (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else {
      res.send(`Data dari berhasil ditambahkan ke liga ${liga}!`);
    }
  });
});

app.put("/pemain/:liga/:id", (req, res) => {
  const id = req.params.id;
  const liga = req.params.liga;

  const { nama, umur, posisi, NA, KA, KSI, harga } = req.body;

  const sql = `UPDATE ${liga} SET nama = ?, umur = ?, posisi = ?, NA = ?, KA = ?, KSI = ?, harga = ? WHERE id = ?`;
  db.query(sql, [nama, umur, posisi, NA, KA, KSI, harga, id], (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.affectedRows === 0) {
      return res.status(404).send("Data tidak ditemukan!");
    } else {
      res.send(`Data dari liga ${liga} dengan id ${id} berhasil diupdate!`);
    }
  });
});

app.delete("/pemain/:liga/:id", (req, res) => {
  const id = req.params.id;
  const liga = req.params.liga;
  const sql = `DELETE FROM ${liga} WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("error: " + err.message);
      return res.status(500).send("Terjadi kesalahan pada server!");
    } else if (result.affectedRows === 0) {
      return res.status(404).send("Data tidak ditemukan!");
    } else {
      res.send(`Data dari liga ${liga} dengan id ${id} berhasil dihapus!`);
    }
  });
});

app.listen(port, () => {
  console.log("Serv}er is running on port " + port);
});
