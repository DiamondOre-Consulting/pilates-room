import { Route , Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeMain from "./pages/HomeMain";
import Signup from "./pages/Signup";
import IntroOffer from "./pages/IntroOffer";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import ClassSchedule from "./pages/ClassSchedule";
import TeacherTraining from "./pages/TeacherTraining";
import SingleTraining from "./components/TeacherTrainingComponents/SingleTraining";
import MoreInfoTrainings from "./components/TeacherTrainingComponents/MoreInfoTrainings";
import PrivateSession from "./pages/PrivateSession";

export default function App() {
  return (
    <>

    <Navbar/>
    <Routes>
        
      <Route path="/" element={<HomeMain/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/intro-offers" element={<IntroOffer/>}/>
      <Route path="/reset-password/:token/:email/:expiry" element={<ResetPassword/>}/>
      <Route path="/class-schedule" element={<ClassSchedule/>}/>
      <Route path="/teacher-training" element={<TeacherTraining/>}/>
      <Route path="/teacher-single-training/:id" element={<SingleTraining/>}/>
      <Route path="/moreInfo/:id" element={<MoreInfoTrainings/>}/> 
      <Route path="/private-session" element={<PrivateSession/>}/>
    </Routes>
    <Footer/>
    </>
  );
}
