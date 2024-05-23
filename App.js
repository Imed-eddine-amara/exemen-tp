import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import HOME from './pages/home.jsx';
import Inscri from './pages/inscription';
import WritePost from './pages/write';
import "./style.scss";
import FOOTER from './compenent/footer.jsx';
import Forget from './pages/forget';
import Logout from './compenent/Logout';
import ProtectedRoute from './compenent/ProtectedRoute';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<Inscri />} />
          <Route path="/home" element={<ProtectedRoute><HOME /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><HOME /></ProtectedRoute>} />
          <Route path="/postpage" element={<WritePost />} />
          <Route path="/forgetpass" element={<Forget />} /> {/* Add this route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <FOOTER />
      </Router>
    </div>
  );
}

export default App;
