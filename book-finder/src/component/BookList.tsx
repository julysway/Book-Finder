import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/bookList.css';
import { Book } from '../redux/bookSlice';
import Paginator from '../component/Paginator';

interface BookListProps {
  items: Book[];
}

const BookList: React.FC<BookListProps> = ({ items }) => {

  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="book-list-container">
    <div className="book-list">
       {paginatedItems.length > 0 ? (
          paginatedItems.map((book, index) => (
          <div className="book-item" key={index}>
            <div className="book-image">
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              ) : (
                <p></p>
              )}
            </div>
            <div className="book-info">
              <div className="book-title">
                <h3>{book.volumeInfo.title}</h3>
              </div>
              <div className="book-description">
              <span>{book.volumeInfo.description}</span>
              </div>
              <div className="book-author">
                <span>{book.volumeInfo.authors?.join(', ') || ''}</span>
              </div>
            </div>

            <div className="details">
              <Link to={`/book/${book.id}`}>
                <span>VIEW DETAILS</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
  </div>
  <Paginator 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage} 
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>

    
  );
};

export default BookList;
