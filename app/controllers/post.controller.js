const DB = require("../models");
const POST = DB.posts;
const SEQUELIZE_OP = DB.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Post
  const post = {
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Post in the database
  POST.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || " Some error occurred while creating the Post.",
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const condition = req.query.title
    ? { title: { [SEQUELIZE_OP.iLike]: `%${req.query.title}%` } }
    : null;

  POST.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || " Some error occurred while retrieving posts.",
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const targetId = req.params.id;

  POST.findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || ` Error retrieving Post with id=${targetId}`,
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const targetId = req.params.id;

  POST.update(req.body, {
    where: { id: targetId },
  })
    .then((num) => {
      if (num.length > 0) {
        if (num[0] === 1) {
          res.send({
            message: "Post was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Post with id=${targetId}. Maybe Post was not found or req.body is empty!`,
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || ` Error updating Post with id=${targetId}`,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const targetId = req.params.id;

  POST.destroy({
    where: { id: targetId },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${targetId}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || ` Could not delete Post with id=${targetId}`,
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  POST.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts.",
      });
    });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
  POST.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};
