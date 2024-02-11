const sql = require("./db.js");

// constructor
const User = function(usuarios) {
  this.NombreUsuario = usuarios.NombreUsuario;
  this.contraseña=usuarios.contraseña;
  this.nombre=usuarios.nombre;
  this.apellidos=usuarios.apellidos;
  this.correo=usuarios.correo;
  this.telefono=usuarios.telefono;
  this.carrera=usuarios.carrera;
  this.escuela=usuarios.escuela;
  this.redSocial=usuarios.redSocial;
  this.foto=usuarios.foto;
  this.rol=usuarios.rol;
};

User.create = (newUsuario, result) => {
  // console.log("entro");
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { usuario: res.insertUsuario, ...newUsuario });
    result(null, { usuario: res.insertUsuario, ...newUsuario });
  });
};

User.findById = (NombreUsuario, result) => {
  sql.query(`SELECT * FROM usuarios WHERE NombreUsuario = ?`, NombreUsuario, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuarios: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (NombreUsuario, result) => {
  let query = "SELECT * FROM usuarios";

  if (NombreUsuario) {
    query += ` WHERE NombreUsuario LIKE '%${NombreUsuario}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};
//aqui obtiene todos los tutoriales publicados
// Tere.getAllPublished = result => {
//   sql.query("SELECT * FROM usuarios WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

User.updateById = (NombreUsuario, usuarios, result) => {
  sql.query(
    "UPDATE usuarios SET nombre = ?, apellidos = ?, correo= ? telefono = ? carrera=? escuela=? redSocial=? WHERE id = ?",
    [usuarios.nombre, usuarios.apellidos, usuarios.correo, usuarios.telefono,usuarios.carrera,usuarios.escuela,usuarios.redSocial, usuarios.NombreUsuario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { NombreUsuario: NombreUsuario, ...NombreUsuario });
      result(null, { NombreUsuario: NombreUsuario, ...NombreUsuario });
    }
  );
};

User.remove = (NombreUsuario, result) => {
  sql.query("DELETE FROM usuarios WHERE NombreUsuario = ?", NombreUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user : ", NombreUsuario);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = User;
