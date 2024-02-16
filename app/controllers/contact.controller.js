const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    res.json(document);
  } catch (err) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.body;
    if (name) {
      documents = await contactService.findByName(name);
      res.json(documents);
    } else {
      documents = await contactService.find({});
      res.json(documents);
    }
  } catch (err) {
    return next(
      new ApiError(500, "An error occurred while retrieving the contact")
    );
  }
};
exports.findOne = (req, res) => {
  res.send({
    message: "findOne handler",
  });
};
exports.update = (req, res) => {
  res.send({
    message: "update handler",
  });
};
exports.delete = (req, res) => {
  res.send({
    message: "delete handler",
  });
};
exports.deleteAll = (req, res) => {
  res.send({
    message: "deleteAllhandler",
  });
};
exports.findAllFavorite = (req, res) => {
  res.send({
    message: "findAllFavorite handler",
  });
};
