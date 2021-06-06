const db = require("../models");
const URL = db.urls;
const Op = db.Sequelize.Op;

// Create and Save a new Url
exports.create = (req, res) => {
  // Validate request
  

  // Create a Url
  console.log(req.headers)
  const url = {
    originalUrl: req.body.originalUrl,
    postFix: req.body.postFixTerm,
    expiryDate: req.body.expiryDate ? req.body.expiryDate : null,
    shortUrl:`${req.headers.host}/${req.body.postFixTerm}`
  };

  // Save Url in the database
  URL.create(url)
    .then((data) => {
      res.send({data, message:'Short link is generated successfully !!!'});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Url.",
      });
    });
};

// Retrieve all Urls from the database.
exports.findAll = (req, res) => {
  try{URL.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Urls.",
      });
    });}
    catch(e){
      console.log(e)
    }
};

// Find a single Url with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  URL.findOne({ where: { id } })
    .then((data) => {
      console.log('Data ---- ', data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Url with id=" + id,
      });
    });
};

// Update a Url by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  URL.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Url was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Url with id=${id}. Maybe Url was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Url with id=" + id,
      });
    });
};

// Delete a Url with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  URL.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Url was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Url with id=${id}. Maybe Url was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Url with id=" + id,
      });
    });
};

// Delete all Urls from the database.
exports.deleteAll = (req, res) => {
  URL.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Urls were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Urls.",
      });
    });
};
