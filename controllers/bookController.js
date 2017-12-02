var bookController = Book => {

    var post = (req, res) => {
                  const book = new Book(req.body);
                  if(!req.body.title){
                      res.status(400);
                      res.send('Title is required');
                  }
                  else{
                    book.save();
                    res.status(201);
                    res.send(book); 
                  }

            };

    var get = (req, res) => {
                const query = {};
                if (req.query.genre) {
                   query.genre = req.query.genre;
                }

                Book.find(query, (err, books) => {                
                  if(err){
                    res.status(500).send(err);
                  }
                  else{
                    res.json(books);
                  }              
                });
            };
    return {
      get : get,
      post : post
    }
};
module.exports = bookController;
