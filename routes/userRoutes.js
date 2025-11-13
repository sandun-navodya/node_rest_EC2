// routes/userRoutes.js
const express = require("express");
const { createNewUser, getAllUsers, deleteUser } = require("../controllers/userController");
const router = express.Router();

// Public Routes
router.route("/")
    .get(getAllUsers)   // GET /api/users
    .post(createNewUser); // POST /api/users

router.route("/:id")
    .delete(deleteUser); // DELETE /api/users/:id

module.exports = router;