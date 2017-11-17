const express = require('express');
	  app = express(),
	  chalk = require('chalk'),
	  log = console.log,
	  PORT = process.env.PORT || 3000,
    bookRouter = express.Router(),
    mongoose = require('mongoose'),
    config = require('./config/database'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const db = mongoose.connect(config.url);
const Book = require('./models/bookModel');

//getting list of books
bookRouter.route('/Books')
          .post( (req, res) => {
            let book = new Book(req.body);
                book.save();
                res.status(201).send(book);
          })
          .get((req, res) => {             
              var query = {};
              if(req.query.genre){
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

//getting book by id from db             
bookRouter.route('/Books/:bookId')
          .get( (req, res) => {

            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                  res.json(book);
                }
              });
          });          
app.use('/api', bookRouter);
app.get('/', (req, res) => {
	res.send('Welcome Here!!');
});

app.listen(PORT, () => {
	log(chalk.green('App is running at PORT : ' + PORT));
});
