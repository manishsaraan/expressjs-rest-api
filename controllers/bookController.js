var bookController = Book => {

    var post = (req, res) => {
                  const book = new Book(req.body);
                  book.save();
                  res.status(201).send(book);
            };

    var get = (req, res) => {
                const query = {};
                if (req.query.genre) {
                   query.genre = req.query.genre;
                }

                Book.find(query, (err, books) => {
                resHandler(err, books, 500, res);               
                });
            };
    return {
      get : get,
      post : post
    }
};
module.exports = bookController;
