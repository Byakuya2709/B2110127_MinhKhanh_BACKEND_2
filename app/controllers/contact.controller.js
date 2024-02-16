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
    res.send({
      message: "create complete",
      contact: document,
    });
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
exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Cannot found"));
    }

    return res.send(document);
  } catch (err) {
    return next(
      new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, `Data not can be empty`));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Cannot found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (err) {
    return next(
      new ApiError(500, `Error updating contact with id = ${req.params.id}`)
    );
  }
};
exports.delete = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Cannot found"));
    }
    return res.send({ message: "Contact was deleted successfully" });
  } catch (err) {
    return next(
      new ApiError(500, `Error deleting contact with id = ${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deleted = await contactService.deleteAll();
    return res.send({
      message: `${deleted.deletedCount} contacts were deleted successfully`,
    });
  } catch (err) {
    return next(new ApiError(500, `An Error  while removing all contact`));
  }
};
exports.findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.findFavorite();
    return res.send(documents);
  } catch (err) {
    return next(
      new ApiError(500, `An Error  while retrieving favorrite contact`)
    );
  }
};
