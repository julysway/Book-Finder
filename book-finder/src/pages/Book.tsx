import React, { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchBookDetails } from '../redux/bookSlice';
import '../styles/book.css';

const Book: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 

    const bookDetails = useSelector((state: RootState) => state.books.selectedBook); 

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchBookDetails(id)); 
        }
    }, [dispatch, id]);

    return (
        <div className="book-container">
            <button className="go-back-btn" onClick={() => navigate('/')}>
                <span>Go back</span>
            </button>

            {bookDetails ? (
                <div className="book-details">
                    <div className="book-img">
                        {bookDetails.volumeInfo.imageLinks?.thumbnail && (
                            <img src={bookDetails.volumeInfo.imageLinks.thumbnail} alt={bookDetails.volumeInfo.title} />
                        )}
                    </div>
                    <div className="book-info">
                        <h2>{bookDetails.volumeInfo.title}</h2>
                        <p>{bookDetails.volumeInfo.description || 'No description available'}</p>
                        <p><strong>Authors:</strong> {bookDetails.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
                        <p><strong>Publisher:</strong> {bookDetails.volumeInfo.publisher || 'Unknown'}</p>
                        <p><strong>Published Date:</strong> {bookDetails.volumeInfo.publishedDate || 'Unknown'}</p>
                        <a href={bookDetails.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">More Info</a>
                    </div>
                </div>
            ) : (
                <AiOutlineLoading3Quarters />
            )}
        </div>
    );
};

export default Book;
