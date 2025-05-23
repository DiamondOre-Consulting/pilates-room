import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Lazy-loaded pages
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Classes = lazy(() => import('./pages/Classes'));
const Packages = lazy(() => import('./pages/Packages'));
const TeacherTraining = lazy(() => import('./pages/TeacherTraining'));
const MembershipPackage = lazy(() => import('./pages/MembershipPackage'));
const BlogManagement = lazy(() => import('./pages/BlogManagement'));
const AllOrders = lazy(() => import('./pages/AllOrders'));
const AllUsers = lazy(() => import('./pages/AllUsers'));
const ContactUsEnquiry = lazy(() => import('./pages/ContactUsEnquiry'));
const TeacherTrainingEnquiry = lazy(() => import('./pages/TeacherTrainingEnquiry'));
const PrivateClassesEnquiry = lazy(() => import('./pages/PrivateClassesEnquiry'));

const App = () => {
  return (
   
      <Suspense fallback={<div className="text-center  h-screen justify-center items-center flex">    <svg  aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/all-class" element={<Classes />} />
            <Route path="/all-packages" element={<Packages />} />
            <Route path="/teacher-training" element={<TeacherTraining />} />
            <Route path="/membership-package" element={<MembershipPackage />} />
            <Route path="/orders" element={<AllOrders />} />
            <Route path="/blog-management" element={<BlogManagement />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/contact-enquiries" element={<ContactUsEnquiry />} />
            <Route path="/teacher-training-enquiries" element={<TeacherTrainingEnquiry />} />
            <Route path="/private-class-enquiries" element={<PrivateClassesEnquiry />} />
          </Route>
        </Routes>
      </Suspense>
   
  );
};

export default App;
