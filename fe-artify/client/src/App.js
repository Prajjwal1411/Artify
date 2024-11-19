import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./Components/EditProfile";
import SubscriptionPage from "./Components/SubscriptionPage";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import ProductCard from "./Reusables/ProductCard"; // Reusable Product Card Test
import HomePage from "./Components/HomePage";
import Profile from "./Components/Profile";
import ArtworkForm from "./Components/ArtworkForm"
import ProductPage from "./Components/ProductPage"
import ProductDetails from "./Components/ProductDetails";
import PaymentPage from './Components/PaymentPage';




function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path='/UploadArt' element={<ArtworkForm/>}/>
       <Route path="/" element={<HomePage />} />
        <Route path='/editProfile' element={<EditProfile/>}/>
        <Route path='/explore' element={<ProductPage/>}/>
        <Route path='/subscription' element={<SubscriptionPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/productcard' element={<ProductCard />} /> {/* Test Route for reusable cards */}
         <Route path='/profile' element={<Profile />} />
         <Route path="/productdetails" element={<ProductDetails />} />
         <Route path="/productdetails/:id" element={<ProductDetails />} /> {/* Test route for product detials by id */}
         <Route path="/payments" element={<PaymentPage />} />
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
