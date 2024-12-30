import './App.css';
import MainLayout from './layout/MainLayout';
import BookList from './pages/BookList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path = "/bookList" element={<BookList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;