import { Route , Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeMain from "./pages/HomeMain";

export default function App() {
  return (
    <>

    <Navbar/>
    <Routes>
        
      <Route path="/" element={<HomeMain/>}/>
    </Routes>
    </>
  );
}
