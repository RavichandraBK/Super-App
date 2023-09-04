import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/Register';
import CategoryPage from './pages/CategoryPage/Category';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<RegisterPage/>}/>
    <Route path='/Category' element={<CategoryPage/>}/>
    </Routes>
    </>
  );
}

export default App;
