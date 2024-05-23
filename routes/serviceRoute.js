const express = require("express");

const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllServices,
  getSingleService,
  postService,
  updateService,
  deleteService,
} = require("../controller/serviceController");

router
  .route("/getAllServices")
  .get(getAllServices);
router
  .route("/postService")
  .post(postService);
router
  .route("/updateService/:id")
  .patch(updateService);
router
  .route("/deleteService/:id")
  .delete(deleteService);
router
  .route("/getSingleService/:id")
  .get(getSingleService);

module.exports = router;
