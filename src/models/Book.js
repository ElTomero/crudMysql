const { query } = require("../database");

class Book {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT book.title, book_author.author_name, book_author.author_surname, book.status FROM book INNER JOIN book_author_relations ON book.book_id = book_author_relations.book_id INNER JOIN book_author ON book_author_relations.author_id = book_author.author_id WHERE book.status IN ('available', 'unavailable') ORDER BY book.title ASC;");
        return exists.length ? exists : false;
    }
    
    async getByCategoryId(categoryId) {
        const category = await query("SELECT * FROM book_category WHERE category_id = ?;", [categoryId])
        if (!category.length) return false;
        
        const book = await query("SELECT * FROM book WHERE category_id = ?;", [categoryId])
        return book.length ? book : false;
    }
    
    async getByPublisherId(publisherId) {
        const publisher = await query("SELECT * FROM publisher WHERE publisher_id = ?;", [publisherId])
        if (!publisher.length) return false;

        const book = await query("SELECT * FROM book WHERE publisher_id = ?;", [publisherId])
        return book.length ? book : false;
    }
    
    async getByAuthorId(authorId) {
        const author = await query("SELECT * FROM book_author_relations WHERE author_id = ?;", [authorId] )
        if (!author.length) return false;

        const book = await query("SELECT * FROM book INNER JOIN book_author_relations ON book.book_id = book_author_relations.book_id WHERE author_id = ?;", [authorId]);
        return book.length ? book : false;
    }

    async getByLanguageId(languageId) {
        const language = await query ("SELECT * FROM book_language WHERE language_id = ?;", [languageId])
        if (!language.length) return false;

        const book = await query("SELECT * FROM book WHERE language_id = ?;", [languageId]);
        return book.length ? book : false;
    }
    
    async getBySearch(search)  {
        const book = await query("SELECT * FROM book WHERE MATCH (title, description, isbn10, isbn13) AGAINST (?);", [search]);
        return book.length ? book : false;
    }

    async getByYear(year) {
        const book = await query("SELECT * FROM book WHERE YEAR(publish_date) = ?", [year]);
        return book.length ? book : false;
    }

    async getByIsbn(isbn) {
        const book = await query("SELECT * FROM book WHERE isbn10 = ? OR isbn13 = ?", [isbn, isbn])
        return book.length ? book : false
    }
    async getById(id) {
        const book = await query("SELECT * FROM book WHERE book_id = ?", [id])
        return book.length ? book : false
    }
}       

module.exports = new Book;