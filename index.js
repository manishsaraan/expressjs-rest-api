const express = require('express');
	  app = express(),
	  chalk = require('chalk'),
	  log = console.log,
	  PORT = process.env.PORT || 3000,
    bookRouter = express.Router(),
    mongoose = require('mongoose'),
    config = require('./config/database');

const db = mongoose.connect(config.url);
const Book = require('./models/bookModel');

bookRouter.route('/Books')
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
app.use('/api', bookRouter);
app.get('/', (req, res) => {
	res.send('Welcome Here!!');
});

app.listen(PORT, () => {
	log(chalk.green('App is running at PORT : ' + PORT));
});
