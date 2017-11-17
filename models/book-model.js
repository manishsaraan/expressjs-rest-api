const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const bookModel = new Schema({
	id: ObjectId,
	title: {
		type: 'string'
	},
	author: {
		type: 'string'
	},
	genre: {
		type: 'string'
	},
	read: {
		type: 'Boolean',
		default: false
	}
});
module.exports = mongoose.model('Book', bookModel);
