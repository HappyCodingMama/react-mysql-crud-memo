import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './add.scss';
import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineArrowLeft } from 'react-icons/ai';

const Add = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    desc: '',
    link: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5500/books', book);
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

          <h3>Add a new book</h3>
        </div>

        <div className='form'>
          <div className='inputs'>
            <div className='input-box'>
              <span>title</span>
              <input
                type='text'
                placeholder='title'
                onChange={handleChange}
                name='title'
                required
              />
            </div>
            <div className='input-box'>
              <span>author</span>
              <input
                type='text'
                placeholder='author'
                onChange={handleChange}
                name='author'
                required
              />
            </div>

            <div className='input-box'>
              <span>about</span>
              <textarea
                type='text'
                placeholder='description'
                onChange={handleChange}
                name='desc'
                cols='60'
                rows='10'
                required
              ></textarea>
            </div>

            <div className='input-box'>
              <span>link</span>
              <input
                type='url'
                placeholder='link'
                onChange={handleChange}
                name='link'
              />
            </div>
          </div>
        </div>
        <div className='button-items'>
          <Link to='/add' onClick={handleClick}>
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

export default Add;
