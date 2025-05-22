import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Packages from './pages/Packages';
import TeacherTraining from './pages/TeacherTraining';
import MembershipPackage from './pages/MembershipPackage';
import BlogManagement from './pages/BlogManagement';
import AllOrders from './pages/AllOrders';

const App = () => {
  return (



    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path='/all-class' element={<Classes />} />
      <Route path='/all-packages' element={<Packages />} />
      <Route path='/teacher-training' element={<TeacherTraining />} />
      <Route path='/membership-package' element={<MembershipPackage />} />
      <Route path='/orders' element={<AllOrders />} />
      <Route path='/blog-management' element={<BlogManagement />} />
    </Routes>


  );
};

export default App;
