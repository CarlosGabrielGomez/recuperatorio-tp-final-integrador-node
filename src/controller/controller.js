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
  // console.log("Usuario creado con ID:", info.lastInsertRowid);
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
  console.log(`Filas actualizadas: ${info.changes}`);
}

// DELETE
function eliminarUsuario(id) {
  const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
  const info = stmt.run(id);
  console.log(`Filas eliminadas: ${info.changes}`);
}

// 🔄 Prueba del CRUD
// crearUsuario('Juan Pérez', 'juan@example.com');
// crearUsuario('Ana López', 'ana@example.com');
// obtenerUsuarios();

// actualizarUsuario(1, 'Juan Actualizado', 'juan_nuevo@example.com');
// eliminarUsuario(2);

export { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
