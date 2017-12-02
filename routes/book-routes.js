const express = require('express');

const bookRouter = express.Router(); // eslint-disable-line new-cap

let resHandler = (err, data, statusCode, res) => {
            if(err){
              res.status(statusCode).send(err);
            }
            else{
              res.json(data);
            }
};

const routes = Book => {
  const bookController = require('../controllers/bookController')(Book);
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
  
// Getting list of books
	bookRouter.route('/')
          .post(bookController.post)
          .get(bookController.get);

	bookRouter.route('/:bookId')
          .get((req, res) => {
          	  res.send(req.book);
          })
          .put( (req, res) => {                  
                  req.book.title = req.body.title
                  req.book.author = req.body.author
                  req.book.genre = req.body.genre
                  req.book.read = req.body.read
                  req.book.save( (err, book) => {
                    resHandler(err, book, 500, res);                    
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
                   resHandler(err, book, 500, res);  
              });
          })
          .delete( (req, res) => {
             req.book.remove( (err, book) => {
                  if(err){
                  res.status(500).send(err);
                  }
                  else{
                    res.status(204).send('Removed.');
                  }
             });
          }); 
	return bookRouter;
};

module.exports = routes;
