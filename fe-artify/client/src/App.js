import React from 'react';
import './App.css';
Artify-3-Edit-Profile-Form
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import EditProfile from './Components/EditProfile';
function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path='/' element={<EditProfile/>}/>
        </Routes>
      </Router>
  );
}

export default App;
