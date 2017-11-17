const express = require('express')
	  app = express(),
	  chalk = require('chalk'),
	  log = console.log,
	  PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Welcome Here!!');
});

app.listen(PORT, () => {
	log(chalk.green('App is running at PORT : ' + PORT));
});
