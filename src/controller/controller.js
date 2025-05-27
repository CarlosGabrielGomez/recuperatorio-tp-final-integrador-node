import { db } from "../config/config.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
`);

// Funciones CRUD

// POST
function crearUsuario(nombre, email) {
  const stmt = db.prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
  const info = stmt.run(nombre, email);
  return info.lastInsertRowid;
}

// GET
const obtenerUsuarios = () => {
  const stmt = db.prepare("SELECT * FROM usuarios");
  const usuarios = stmt.all();
  return usuarios;
};

// UPDATE
function actualizarUsuario(id, nuevoNombre, nuevoEmail) {
  const stmt = db.prepare(
    "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?"
  );
  const info = stmt.run(nuevoNombre, nuevoEmail, id);
  return info.changes;
}

// DELETE
function eliminarUsuario(id) {
  const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
  const info = stmt.run(id);
  return info.changes;
}

export { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
