const express = require("express");
const app = express();

app.use(express.json());

let items = [];

// GET todos los items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST crear item
app.post("/items", (req, res) => {
  const nuevoItem = req.body;
  items.push(nuevoItem);
  res.json({
    mensaje: "Item agregado",
    item: nuevoItem,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor iniciado en puerto", port);
});
