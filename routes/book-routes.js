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
  bookRouter.use('/:bookId', function(req, res, next){
    Book.findById(req.params.bookId, (err, book) => {
              if (err) {
                res.status(500).send(err);
              } else if(book){
                  req.book = book;
                  next();
              }
              else {
                res.status(404).send('No book found..'); 
              }
            });
  });
	bookRouter.route('/:bookId')
          .get((req, res) => {
          	  res.send(req.book);
          })
          .put( (req, res) => {
             Book.findById(req.params.bookId, (err, book) => {
                if(err){
                  res.status(500).send(err);
                }
                else{
                  req.book.title = req.body.title
                  req.book.author = req.body.author
                  req.book.genre = req.body.genre
                  req.book.read = req.body.read
                  res.send( (err, book) => {
                    if(err){
                      res.status(500).send(err);
                    }
                    else{
                      res.json(book);
                    }
                  });
                }
             });
          })
          .patch( (req, res) => {
              if(req.body._id)
                delete req.body._id;

              for(var p in req.body)
              {
                  req.book[p] = req.body[p];
              }
              req.book.save( (err, book) => {
                  if(err){
                  res.status(500).send(err);
                  }
                  else{
                    res.json(book);
                  }
              });
          }); 
	return bookRouter;
};

module.exports = routes;
