const express = require("express");
const newsController = require("./../controllers/newsController");

const router = express.Router();

router.route("/trending").get(newsController.getTrendingNews);
router.route("/:search").get(newsController.searchNews);

module.exports = router;
