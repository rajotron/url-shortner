module.exports = app => {
  const urls = require("../controllers/urls.controller.js");

  var router = require("express").Router();

  // Create a new url
  router.post("/", urls.create);

  // Retrieve all urls
  router.get("/", urls.findAll);

  // Retrieve a single url with id
  router.get("/:id", urls.findOne);

  // Update a url with id
  router.put("/:id", urls.update);

  // Delete a url with id
  router.delete("/:id", urls.delete);


  app.use("/api/urls", router);
};
