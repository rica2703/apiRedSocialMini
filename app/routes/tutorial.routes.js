module.exports = app => {
  const UserBD = require("../controllers/usuario.controller.js");
  // const tereBD2 = require("../controllers/ventas.controller.js");
  const PublicacionesBD = require("../controllers/publicaciones.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", UserBD.create);

  // Retrieve all Tutorials
  router.get("/", UserBD.findAll);

  // Retrieve all USERS
  // router.get("/usuario", UserBD.findAllPublished);

  // Retrieve a single user with id
  router.get("/:NombreUsuario", UserBD.findOne);

  // Update a Tutorial with id
  router.put("/:NombreUsuario", UserBD.update);

  // Delete a Tutorial with id
  router.delete("/:NombreUsuario", UserBD.delete);

  // Delete all Tutorials
  router.delete("/", UserBD.deleteAll);

  // ---------------------
  // var router2 = require("express").Router();
  // Create a new Tutorial
  // router2.post("/", tereBD2.create);

  // Retrieve all Tutorials
  // router2.get("/", tereBD2.findAll);

  // Retrieve all USERS
  // router2.get("/ventas", tereBD2.findAllPublished);

  // Retrieve a single user with id
  // router2.get("/:conceptoPago", tereBD2.findOne);

  // Update a Tutorial with id
  // router2.put("/:conceptoPago", tereBD2.update);
 
  // Delete a Tutorial with id
  // router2.delete("/:conceptoPago", tereBD2.delete);

  // Delete all Tutorials
  // router2.delete("/", tereBD2.deleteAll);
  // -------------------------------
  var router3 = require("express").Router();
  router3.post("/", PublicacionesBD.create);
  router3.get("/", PublicacionesBD.findAll);
  router3.get("/:nombreUsuario", PublicacionesBD.findOne);
  // router3.put("/:codigo", PublicacionesBD.update);
  router3.delete("/:id", PublicacionesBD.delete);
  router3.delete("/", PublicacionesBD.deleteAll);

  app.use('/api/publicaciones', router3);
  // app.use('/api/ventas', router2);
  app.use('/api/usuarios', router);
};
