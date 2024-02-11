const Publicaciones = require("../models/publicaciones.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const publicacion = new Publicaciones({
    nombreUsuario:req.body.nombreUsuario,
    id:req.body.id,
    textoPublicado:req.body.textoPublicado,
    horaPublicado:req.body.horaPublicado,
    fechaPublicado:req.body.fechaPublicado,
    evento:req.body.evento|| false
  });

  // Save Tutorial in the database
  Publicaciones.create(publicacion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the publicacion."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Publicaciones.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Product by code
exports.findOne = (req, res) => {
  Publicaciones.findById(req.params.nombreUsuario, (err, data) => {
    if (err) { 
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Publicaciones with nombreUsuario ${req.params.nombreUsuario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Publicacion with nombreUsuario " + req.params.nombreUsuario
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tere.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Publicaciones.updateById(
//     req.params.codigo,
//     new Tere(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found TereBD with id ${req.params.codigo}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating TereBD with id " + req.params.codigo
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// Delete a product with the specified code in the request
exports.delete = (req, res) => {
  Publicaciones.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Publicacion with nombreUsuario ${req.params.nombreUsuario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Publicacion with nombreUsuario " + req.params.nombreUsuario
        });
      }
    } else res.send({ message: `Publicacion was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Publicaciones.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Publicaciones"
      });
    else res.send({ message: `All Publicaciones were deleted successfully!` });
  });
};
