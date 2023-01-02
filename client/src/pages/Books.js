import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './books.scss';
import {
  AiOutlineLink,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from 'react-icons/ai';

import { FiExternalLink } from 'react-icons/fi';

//https://memo-react-mysql-backend.onrender.com

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5500/books');
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure that you wanted to delete this?')) {
      try {
        await axios.delete('http://localhost:5500/books/' + id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <div className='container'>
      <div className='books-container'>
        <div className='title'>
          <h1>Memo</h1>
        </div>
        <div className='books-items'>
          {books
            .slice()
            .reverse()
            .map((book) => (
              <div className='book' key={book.id}>
                <div className='book-contents'>
                  {book.cover && <img src={book.cover} alt='' />}
                  <h2>{book.title}</h2>
                  <h3>BY {book.author}</h3>
                  <p>{book.desc}</p>

                  <div
                    className='link'
                    role='link'
                    onClick={() => openInNewTab(book.link)}
                  >
                    <small>
                      <FiExternalLink />
                    </small>
                  </div>
                </div>

                <div className='buttons'>
                  <div className='delete' onClick={() => handleDelete(book.id)}>
                    <AiOutlineDelete />
                    Delete
                  </div>
                  <div className='update'>
                    <AiOutlineEdit />
                    <Link to={`/update/${book.id}`} state={book}>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='button-items'>
          <Link to='/add'>
            <div className='button'>
              <button type='submit' className='form-button'>
                Add
              </button>
            </div>
            <div className='icon'>
              <AiOutlinePlus />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Books;
