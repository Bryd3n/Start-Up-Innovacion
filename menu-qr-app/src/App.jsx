import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Admin/Login';
import Register from './pages/Admin/Register';
import MenuClient from './pages/Client/MenuClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/menu/:slug" element={<MenuClient />} />
      </Routes>
    </Router>
  );
}

export default App;
