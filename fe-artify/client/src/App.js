import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import EditProfile from './Components/EditProfile';
import SubscriptionPage from './Components/SubscriptionPage';
function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
        <Route path='/' element={<EditProfile/>}/>
        <Route path='/subscription' element={<SubscriptionPage/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
