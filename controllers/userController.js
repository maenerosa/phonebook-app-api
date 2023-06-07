import bcrypt from "bcrypt";
import User from "../models/User.js";

async function getUsers(_req, res) {
  const users = await User.find({});

  return res.status(200).json(users);
}

async function createUser(req, res, next) {
  try {
    const { username, name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (username === undefined) {
      return res.status(404).json({ error: "Username is missing" });
    }

    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(404).json({ error: "Username already exists" });

    if (username === "")
      return res.status(404).json({ error: "Username is required" });

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUsers,
};
