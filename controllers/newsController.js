const fetch = require("node-fetch");
const apiKey = process.env.NEWS_API_KEY;

exports.getTrendingNews = async (req, res) => {
  try {
    // const category = req.query.category || "all";
    const page = req.query.page || 1;
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&pageSize=20&page=${page}&apiKey=${apiKey}`
    );
    const body = await response.json();
    res.status(200).json(body);
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.searchNews = async (req, res) => {
  try {
    const searchQuery = req.params.search;
    const sort = req.query.sortBy || "popularity";
    const page = req.query.page || 1;
    console.log(sort);
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=${sort}&pageSize=20&page=${page}&apiKey=${apiKey}`
    );
    const body = await response.json();
    res.status(200).json(body);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
