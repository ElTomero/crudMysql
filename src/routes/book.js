const router = require("express").Router();
const Book = require("../models/Book.js");
const { response } = require("../utils");

router.get("/", async (req, res) => {
    const result = await Book.getAll();
    return response(res, result);
});

router.get("/category/:id", async (req, res) => {
    const category_id = req.params.id;
    const result = await Book.getByCategoryId(category_id);
    return response(res, result);
});




module.exports = router;