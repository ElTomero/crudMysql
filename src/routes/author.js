const router = require("express").Router();
const Author = require("../models/Author.js");
const { response } = require("../utils");

router.get("/", async (req, res) => {
    const result = await Author.getAll();
    return response(res, result);
});


module.exports = router;