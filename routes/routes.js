require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../middleware/jwtAuthenticator");
const createNotes = require("../views/create-notes");
const shareNotes = require("../views/share-notes");
const home = require("../views/home");
const signInTemplate = require("../views/signin");
const alreadySignedinTemplate = require("../views/already-signedin");
const signUpTemplate = require("../views/signup");
const { User, Note, NoteSharing } = require("../models");
const { ValidationError } = require("sequelize");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    return res.send(alreadySignedinTemplate());
  }
  res.send(signInTemplate());
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.send("Invalid Username");
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_ACCESS_KEY,
        {
          expiresIn: 86400, //24h expired
        }
      );
      res.cookie("auth", token);
      res.redirect("/home");
    } else {
      return res.send("Invalid Password");
    }
  } catch (error) {
    return res.sendStatus(404);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

router.get("/signup", (req, res) => {
  res.send(signUpTemplate());
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username == "") {
      return res.send({ error: 1, message: "Username can't be empty" });
    }
    if (password == "") {
      return res.send({ error: 1, message: "Password can't be empty" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashPassword });
    res.send({
      error: 0,
      message: "User created successfully",
      data: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.send({ error: 1, message: error.errors[0].message });
    }
    res.sendStatus(500);
  }
});

router.get("/create-notes", authenticateJWT, (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(createNotes());
});

router.post("/create-notes", authenticateJWT, async (req, res) => {
  const { title, body, type } = req.body;
  const { id } = req.user;
  try {
    const note = await Note.create({ title, body, type, userId: id });
    res.send({
      error: 0,
      message: "Note saved Successfully",
      data: note,
    });
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});


router.get("/note/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const note = await Note.findOne({ where: { id } });
    // if (note.userId != user.id) {
    //   return res.sendStatus(401);
    // }
    res.send(shareNotes({ note, user }));
  } catch (error) {
    console.log(error)
    res.sendStatus(401);
  }
});

router.post("/note/:id", authenticateJWT, async (req, res) => {
  const { sharedUser } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { username: sharedUser } });

    if (!user) {
      return res.send({ error: 1, message: "User not found" });
    }

    const noteSharing = await NoteSharing.create({
      userId: user.id,
      noteId: id,
    });

    res.send({ error: 0, message: `Shared to ${user.username} successfully` });
  } catch (error) {
    console.log(error)
    res.sendStatus(401);
  }
});


router.get("/home", authenticateJWT, async (req, res) => {
  const { id } = req.user;
  try {
    const notes = await Note.findAll({
      where: { userId: id },
      include: [
        {
          model: User,
        },
      ],
    });

    const sharedNotes = await User.findOne({
      where: { id },
      include: [
        {
          model: Note,
          as: "notes",
          include: {
            model: User,
          },
        },
      ],
    });
    res.send(home({ data: notes, user: req.user, sharedNotes: sharedNotes }));
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = router;
