const redmineSchema = require("../models/redmine");
const { createUser, listUsers, blockUser } = require("../service/users");

const postRedminers = async (req, res) => {
  try {
    let redminer;
    const response = await createUser(req.body);
    if (response) {
      redminer = await new redmineSchema({
        ...req.body,
        rm_id: response.data.user.id,
      });
      redminer.save();

      return res.status(201).json(redminer);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getRedminers = async (req, res) => {
  try {
    let redminers;
    const response = listUsers(req.body);
    if (response === "Users listed successfully!") {
      redminers = await redmineSchema.find({});
      res.status(200).json(redminers);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const blockRedminers = async (req, res) => {
  try {
    let deletedRedminer;
    const response = blockUser(req.body);
    if (response === "User Blocked!") {
      deletedRedminer = await redmineSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: 3,
        }
      );
    }
    res.status(200).json(deletedRedminer);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  postRedminers,
  getRedminers,
  blockRedminers,
};
