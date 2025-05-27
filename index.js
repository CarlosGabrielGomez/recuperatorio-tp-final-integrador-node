import {
  crearUsuario,
  eliminarUsuario,
  obtenerUsuarios,
  actualizarUsuario,
} from "./src/controller/controller.js";

import express from "express";

process.loadEnvFile();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

//obtener todos los usuarios

app.get("/all", async (req, res) => {
  const val = await obtenerUsuarios();
  res.status(200).json(val);
});

//crear usuario

app.post("/create", async (req, res) => {
  const { nombre, email } = req.body;
  const val = await crearUsuario(nombre, email);
  res.status(200).json({ id: val });
});

//modificar usuario
app.put("/update/:id", async (req, res) => {
  const { nombre, email } = req.body;
  const id = req.params.id;
  const val = await actualizarUsuario(id, nombre, email);
  res.status(200).json({ FilasModificadas: val });
});

//eliminar
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const val = await eliminarUsuario(id);
  res.status(200).json({ FilasEliminadas: val });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
