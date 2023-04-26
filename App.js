import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [activeLink, setActiveLink] = useState('google');
  const [xmlData, setXmlData] = useState(null);

  const blogsPerPage = 3;

  useEffect(() => {
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1b2e11067ed1471db7be65d075b31486'
      )
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.log(err));

    fetch('app.xml')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  const handleLinkClick = (source) => {
    setActiveLink(source);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(news.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>Welcome To My Block</h1>
      <header className="App-header">
        <nav className="navbar">
          <ul>
            <li>
              <a
                className={activeLink === 'google' ? 'active' : ''}
                href="#google-news"
                onClick={() => handleLinkClick('google')}
              >
                News
              </a>
            </li>
            <li>
              <a
                className={activeLink === 'json' ? 'active' : ''}
                href="#json-news"
                onClick={() => handleLinkClick('json')}
              >
                Main
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="cont">
        {activeLink === 'google' && (
          <>
            <h2>News</h2>
            <div className="card-cont">
              {news.map((article) => (
                <div className="card" key={article.title}>
                  <img
                    className="card-img"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                  <div className="card-cont">
                    <p className="card-date">
                      <em>{article.publishedAt}</em>
                    </p>
                    <p className="card-author">By {article.author}</p>
                    <p className="card-desc">{article.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeLink === 'json' && (
          <>
            <h2>All Details In Blog</h2>
            {blogs.map((blog) => (
              <div className="card" key={blog.title}>
                <img
                  className="card-image"
                  src={blog.image}
                  alt={blog.title}
                />
                <div className="card-content">
                  <h1 className="card-title">{blog.title}</h1>
                  <p className="card-date">{blog.date}</p>
                  <p className="card-author">{blog.author}</p>
                  <p className="card-summary">{blog.summary}</p>
                  <p className="card-image">{blog.image}</p>
                  <p className="card-text">{blog.text}</p>
                  <p className="card-url">{blog.url}</p>
                   </div>
              </div>
            ))}
          </>
        )}
        
      </div>
   
         
      <footer className="footer">
        <p>@CopyRight Pushpak</p>
      </footer>
      
    </div>
    
  );
}

export default Blog;
                  