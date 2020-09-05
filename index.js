if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()    // loads variables from .env and imports into process.env.DATABASE_URL
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/authors.js');
const bookRouter = require('./routes/books.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000!");
});