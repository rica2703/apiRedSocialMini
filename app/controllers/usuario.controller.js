const User = require("../models/usuario.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const Usuario = new User({
    NombreUsuario:req.body.NombreUsuario,
    contraseña: req.body.contraseña,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos, 
    correo:req.body.correo, 
    telefono:req.body.telefono,
    carrera:req.body.carrera,
    escuela:req.body.escuela,
    redSocial:req.body.redSocial,
    foto:req.body.foto,
    rol:req.body.rol|| false
  });

  // Save Tutorial in the database
  User.create(Usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Usuario."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single user by user
exports.findOne = (req, res) => {
  User.findById(req.params.NombreUsuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Red Social with id ${req.params.NombreUsuario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving RedSocial with id " + req.params.NombreUsuario
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   User.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Red Social with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Red Social with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.NombreUsuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Red Social with id ${req.params.NombreUsuario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Red Social with user " + req.params.NombreUsuario
        });
      }
    } else res.send({ message: `Red Social was deleted successfully! el ultimo else` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else res.send({ message: `All Red Social were deleted successfully!` });
  });
};
