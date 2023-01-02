import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './add.scss';
import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineArrowLeft } from 'react-icons/ai';

const Update = () => {
  const state = useLocation().state;

  const [book, setBook] = useState({
    title: state?.title || '',
    author: state?.author || '',
    desc: state?.desc || '',
    link: state?.link || '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split('/')[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put('http://localhost:5500/books/' + bookId, book)
        : await axios.post('http://localhost:5500/books', book);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <div className='add-container'>
        <div className='add-title'>
          <div className='home'>
            <AiOutlineArrowLeft />
            <Link to='/'>
              <h1>Memo</h1>
            </Link>
          </div>
          <h3>Update the book</h3>
        </div>

        <div className='form'>
          <div className='inputs'>
            <div className='input-box'>
              <span>title</span>
              <input
                type='text'
                placeholder='title'
                onChange={handleChange}
                value={book.title}
                name='title'
              />
            </div>
            <div className='input-box'>
              <span>author</span>
              <input
                type='text'
                placeholder='author'
                onChange={handleChange}
                value={book.author}
                name='author'
              />
            </div>

            <div className='input-box'>
              <span>about</span>
              <textarea
                type='text'
                placeholder='description'
                onChange={handleChange}
                value={book.desc}
                name='desc'
                cols='60'
                rows='10'
              ></textarea>
            </div>

            <div className='input-box'>
              <span>link</span>
              <input
                type='text'
                placeholder='link'
                onChange={handleChange}
                value={book.link}
                name='link'
              />
            </div>
          </div>
        </div>
        <div className='button-items'>
          <Link to='/add' onClick={handleClick}>
            <div className='button'>
              <button type='submit' className='form-button'>
                Update
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

export default Update;
