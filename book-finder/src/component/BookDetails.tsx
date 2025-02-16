import React from 'react';

interface BookDetailProps {
  book: any;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  return (
    <div>
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.description}</p>
      <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
      </a>
    </div>
  );
};

export default BookDetail;
