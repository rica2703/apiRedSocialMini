const sql = require("./db.js");

// constructor
const Publicaciones = function(publicacion) {
  this.nombreUsuario = publicacion.nombreUsuario;
  this.id=publicacion.id;
  this.textoPublicado=publicacion.textoPublicado;
  this.horaPublicado=publicacion.horaPublicado;
  this.fechaPublicado=publicacion.fechaPublicado;
  this.evento=publicacion.evento;
};

Publicaciones.create = (newPublicacion, result) => {
  sql.query("INSERT INTO publicaciones SET ?", newPublicacion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created publicacion: ", { nombreUsuario: newPublicacion.nombreUsuario, ...newPublicacion });
    result(null, { nombreUsuario: newPublicacion.nombreUsuario, ...newPublicacion });
  });
};

Publicaciones.findById = (nombreUsuario, result) => {
  sql.query(`SELECT * FROM publicaciones WHERE nombreUsuario = ?`, nombreUsuario, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; 
    }

    if (res.length) {
      console.log("found publicaciones: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "no_se_encontro_publicacion" }, null);
  });
};

Publicaciones.getAll = (nombreUsuario, result) => {
  let query = "SELECT * FROM publicaciones";

  if (nombreUsuario) {
    query += ` WHERE nombreUsuario LIKE '%${nombreUsuario}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Publicaciones: ", res);
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

// Publicaciones.updateById = (nombreUsuario, publicaciones, result) => {
//   sql.query(
//     "UPDATE publicaciones SET nombreP = ?,urlImagen=?, descripcion = ?, precioUnitario= ? WHERE codigoProducto = ?",
//     [productos.nombreP,productos.urlImagen ,productos.descripcion,productos.precioUnitario,codigoProducto],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated product: ", { codigoProducto: codigoProducto, ...codigoProducto });
//       result(null, { codigoProducto: codigoProducto, ...codigoProducto });
//     }
//   );
// };

Publicaciones.remove = (id, result) => {
  sql.query("DELETE FROM publicaciones WHERE id = ?", id, (err, res) => {
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

    console.log("deleted publicacion : ", id);
    result(null, res);
  });
};

Publicaciones.removeAll = result => {
  sql.query("DELETE FROM publicaciones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} publicaciones`);
    result(null, res);
  });
};

module.exports = Publicaciones;
