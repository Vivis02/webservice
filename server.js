const express = require("express");
const app = express();

app.use(express.json());

let items = [];
let idCounter = 1;

// GET - Obtener todos
app.get("/items", (req, res) => {
  res.json(items);
});

// POST - Crear nuevo
app.post("/items", (req, res) => {
  const nuevoItem = {
    id: idCounter++,
    nombre: req.body.nombre,
    precio: req.body.precio
  };

  items.push(nuevoItem);

  res.json({
    mensaje: "Item agregado correctamente",
    item: nuevoItem
  });
});

// PUT - Modificar
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  item.nombre = req.body.nombre || item.nombre;
  item.precio = req.body.precio || item.precio;

  res.json({
    mensaje: "Item actualizado correctamente",
    item
  });
});

// DELETE - Eliminar
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  const eliminado = items.splice(index, 1);

  res.json({
    mensaje: "Item eliminado correctamente",
    item: eliminado[0]
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor corriendo en puerto", port);
});
