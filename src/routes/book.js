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

router.get("/publisher/:id", async (req, res) => {
    const publisher_id = req.params.id;
    const result = await Book.getByPublisherId(publisher_id);
    return response(res, result);
});

router.get("/author/:id", async (req, res) => {
    const author_id = req.params.id;
    const result = await Book.getByAuthorId(author_id);
    return response(res, result);
});

router.get("/language/:id", async (req, res) => {
    const language_id = req.params.id;
    const result = await Book.getByLanguageId(language_id);
    return response(res, result);
});

router.get("/search", async (req, res) => {
    const search = req.query.q;
    const result = await Book.getBySearch(search);
    return response(res, result);
});

router.get("/year/:year", async (req, res) => {
    const year = req.params.year;
    const result = await Book.getByYear(year);
    return response(res, result);    
});

router.get('/book/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const result = await Book.getByIsbn(isbn);
    return response(res, result);
});

router.get("/book/id/:id", async (req, res) => {
    const id = req.params.id;
    const result = await Book.getById(id)
    return response(res, result)
})
module.exports = router;
