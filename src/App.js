import React from 'react';
import './App.css';
import myContext from './components/Contexts/myContext';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RegisterPage from './pages/RegisterPage/Register';
import CategoryPage from './pages/CategoryPage/Category';
import HomePage from './pages/HomePage/Home'

function App() {
      let [valid, setValid] = useState({
        chk:[],
        count:0,
      });
      let [Variables, setVariables] = useState({
        id:{
          NextPage:false,
        },
      });
  return (
    <>
    <myContext.Provider value={{Variables,setVariables,valid,setValid}}>
    <Routes>
    <Route path='/' element={<RegisterPage/>}/>
    <Route path='/Category' element={<CategoryPage/>}/>
    <Route path='/Home' element={<HomePage/>}/>
    </Routes>
    </myContext.Provider>
    </>
  );
}

export default App;
