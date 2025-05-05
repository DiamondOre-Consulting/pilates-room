import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Classes from './pages/Classes';


const App = () => {
  return (
   
      
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path='/all-class' element={<Classes/>}/>
        
        </Routes>
   
  
  );
};

export default App;
