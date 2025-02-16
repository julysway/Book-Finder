import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import booksReducer from '../redux/bookSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

