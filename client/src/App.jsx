import { Route , Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeMain from "./pages/HomeMain";
import Signup from "./pages/Signup";
import IntroOffer from "./pages/IntroOffer";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import ClassSchedule from "./pages/ClassSchedule";

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
    </Routes>
    <Footer/>
    </>
  );
}
