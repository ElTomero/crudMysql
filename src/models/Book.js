const { query } = require("../database");

class Book {
    constructor() {

    }

    async getAll() {
        const exists = await query("SELECT book.title, book_author.author_name, book_author.author_surname, book.status FROM book INNER JOIN book_author_relations ON book.book_id = book_author_relations.book_id INNER JOIN book_author ON book_author_relations.author_id = book_author.author_id WHERE book.status IN ('available', 'unavailable') ORDER BY book.title ASC;");
        return exists.length ? exists : false;
    }
    
    async getByCategoryId(categoryId) {
        const category = await query("SELECT * FROM book_category WHERE category_id = ?", [categoryId])
        if (!category.length) return false;
        
        const book = await query("SELECT * FROM book WHERE category_id = ?", [categoryId])
        return book.length ? book : false;
    }  
}


module.exports = new Book;