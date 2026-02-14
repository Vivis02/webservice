const express = require("express");
const app = express();

app.use(express.json());

let items = [];

// GET
app.get("/items", (req, res) => {
  res.json(items);
});

// POST
app.post("/items", (req, res) => {
  const nuevoItem = req.body;
  items.push(nuevoItem);
  res.json({
    mensaje: "Item agregado correctamente",
    item: nuevoItem
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor corriendo en puerto", port);
});
