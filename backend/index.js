import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yangyi3823!',
  database: 'library',
});

//test
app.get('/', (req, res) => {
  res.json('hello');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books;';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'SELECT * FROM books WHERE id = ?';
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`, `author`,`desc`, `link`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.link,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been created successfully.');
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'DELETE FROM books WHERE id = ?';

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been deleted successfully.');
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'UPDATE books SET `title`= ?, `author`= ?, `desc`= ?, `link` = ? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.link,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been updated successfully.');
  });
});

app.listen(5500, () => {
  console.log('Connected to backend');
});
