const router = require("express").Router();
const Category = require("../models/Category.js");
const { response } = require("../utils");

router.get("/", async (req, res) => {
    const result = await Category.getAll();
    return response(res, result);
});




module.exports = router;