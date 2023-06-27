import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCompany from "./pages/AddCompany";
import AllCompanies from "./pages/AllCompanies";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
        <Router>
           <Navbar/>
           <Routes>
             <Route path="/" element={<AddCompany/>}></Route>
             <Route path="/companies" element={<AllCompanies/>}></Route>
           </Routes>
        </Router> 
    </div>
  );
}

export default App;
