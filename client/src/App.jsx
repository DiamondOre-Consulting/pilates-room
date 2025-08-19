import React, { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { userData } from "./Redux/Slices/authSlice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUsPage from "./pages/ContactUsPage";
import InStudioTerms from "./pages/InSudioTerms";

// Lazy-loaded pages
const HomeMain = lazy(() => import("./pages/HomeMain"));
const Signup = lazy(() => import("./pages/Signup"));
const IntroOffer = lazy(() => import("./pages/IntroOffer"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ClassSchedule = lazy(() => import("./pages/ClassSchedule"));
const TeacherTraining = lazy(() => import("./pages/TeacherTraining"));
const SingleTraining = lazy(() =>
  import("./components/TeacherTrainingComponents/SingleTraining")
);
const MoreInfoTrainings = lazy(() =>
  import("./components/TeacherTrainingComponents/MoreInfoTrainings")
);
const PrivateSession = lazy(() => import("./pages/PrivateSession"));
const Membership = lazy(() => import("./pages/Membership"));
const Aboutus = lazy(() => import("./pages/Aboutus"));
const SingleBlogPage = lazy(() => import("./components/SingleBlogPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(userData());
    };
    fetchData();
  }, [location.pathname, dispatch]);

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="text-center  h-screen justify-center items-center flex">
            {" "}
            <svg
              aria-hidden="true"
              class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/why-pilates" element={<IntroOffer />} />
          <Route
            path="/reset-password/:token/:email/:expiry"
            element={<ResetPassword />}
          />
          <Route path="/class-schedule" element={<ClassSchedule />} />
          <Route path="/teacher-training" element={<TeacherTraining />} />
          <Route
            path="/teacher-single-training/:id"
            element={<SingleTraining />}
          />
          <Route path="/moreInfo/:id" element={<MoreInfoTrainings />} />
          <Route path="/private-session" element={<PrivateSession />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/:slug" element={<SingleBlogPage />} />
          <Route path="/all-blogs" element={<BlogPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route
            path="/in-studio-terms-and-conditions"
            element={<InStudioTerms />}
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
