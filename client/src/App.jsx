import { Route , Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeMain from "./pages/HomeMain";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>

    <Navbar/>
    <Routes>
        
      <Route path="/" element={<HomeMain/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
    </Routes>
    </>
  );
}
