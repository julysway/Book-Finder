import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './styles/app.css';
import Header from './component/Header';
import Home from './pages/Home';
import Book from './pages/Book'; 

function App() {
  const [query, setQuery] = useState('');

  return (
    <Router>
      <Header query={query} setQuery={setQuery} />

      <Routes>
        <Route path="/" element={<Home query={query} />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;

