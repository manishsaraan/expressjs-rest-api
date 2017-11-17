const express = require('express');

const app = express();
const chalk = require('chalk');

const log = console.log;
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(config.url);
const Book = require('./models/book-model');
const bookRouter = require('./routes/book-routes')(Book);

app.use('/api/books', bookRouter);
app.get('/', (req, res) => {
	res.send('Welcome Here!!');
});

app.listen(PORT, () => {
	log(chalk.green('App is running at PORT : ' + PORT));
});
