import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/login';
import Register from './pages/register';
import Tasks from './pages/tasks';
import './App.css';
import Navbar from './Layouts/Navbar';
import Auth from './Auth/Auth';

function App() {

  return (
    <Router>
      <Navbar  />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tasks" element={
          <Auth>
          <Tasks />
          </Auth>
          } />
      </Routes>
    </Router>
  );
}


export default App;
