import React, { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/bookSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../component/BookList';

interface HomeProps {
  query: string;
}

const Home: React.FC<HomeProps> = ({ query }) => {
  const dispatch = useAppDispatch();
  const { books, status, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (query.trim().length > 2) {
      dispatch(fetchBooks({ query }));
    }
  }, [query, dispatch]);

  return (
    <div>
      {status === 'loading' && <p><AiOutlineLoading3Quarters /></p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {books.length > 0 && <BookList items={books} />}
    </div>
  );
};

export default Home;

