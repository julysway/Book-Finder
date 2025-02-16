import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    categories?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    language?: string;
    infoLink?: string;
  };
}

export interface BooksResponse {
  items: Book[];
}

interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  selectedBook: null,
  status: 'idle',
  error: null,
};


export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, startIndex = 0, maxResults = 20 }: { query: string; startIndex?: number; maxResults?: number }) => {
    try {
      const response = await axios.get<BooksResponse>(BASE_URL, {
        params: { q: query, startIndex, maxResults },
      });

      return response.data.items || []; 
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
);


export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async (bookId: string) => {
    try {
      const response = await axios.get<Book>(`${BASE_URL}/${bookId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { clearSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;

