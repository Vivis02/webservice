const express = require("express");
const app = express();

app.use(express.json());

let items = [];
let contadorId = 1; // contador para IDs

// GET - obtener todos
app.get("/items", (req, res) => {
  res.json(items);
});

// GET por ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  res.json(item);
});

// POST - crear nuevo
app.post("/items", (req, res) => {
  const nuevoItem = {
    id: contadorId++,
    nombre: req.body.nombre,
    precio: req.body.precio
  };

  items.push(nuevoItem);

  res.status(201).json({
    mensaje: "Item agregado correctamente",
    item: nuevoItem
  });
});

// PUT - actualizar
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  item.nombre = req.body.nombre ?? item.nombre;
  item.precio = req.body.precio ?? item.precio;

  res.json({
    mensaje: "Item actualizado",
    item
  });
});

// DELETE - eliminar
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  items.splice(index, 1);

  res.json({ mensaje: "Item eliminado correctamente" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor corriendo en puerto", port);
});
