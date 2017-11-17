const express = require('express');

const bookRouter = express.Router(); // eslint-disable-line new-cap
const routes = Book => {
// Getting list of books
	bookRouter.route('/')
          .post((req, res) => {
	const book = new Book(req.body);
	book.save();
	res.status(201).send(book);
})
          .get((req, res) => {
	const query = {};
	if (req.query.genre) {
		query.genre = req.query.genre;
	}

	Book.find(query, (err, books) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(books);
		}
	});
});

// Getting book by id from db
	bookRouter.route('/:bookId')
          .get((req, res) => {
          	Book.findById(req.params.bookId, (err, book) => {
          		if (err) {
          			res.status(500).send(err);
          		} else {
          			res.json(book);
          		}
          	});
          })
          .put( (req, res) => {
             Book.findById(req.params.bookId, (err, book) => {
                if(err){
                  res.status(500).send(err);
                }
                else{
                  book.title = req.body.title
                  book.author = req.body.author
                  book.genre = req.body.genre
                  book.read = req.body.read
                  book.save();
                  res.json(book);
                }
             });
          });
	return bookRouter;
};

module.exports = routes;
