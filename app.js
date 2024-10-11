// app.js
const express = require("express");
const path = require("path");
const database = require("./config");
const app = express();
const PORT = process.env.APP_PORT;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Endpoint para buscar estudiantes
app.get("/person/:id", (req, res) => {
  const personId = req.params.id;

  database.getStudentById(personId, (err, student) => {
    if (err) {
      res.status(err.message === "Student not found" ? 404 : 500).json({ error: err.message });
      return;
    }
    res.json(student);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});