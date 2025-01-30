import { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import '../App.css';
import api from '../utils/axios'



function Navbar() {
  const [isAuthenticated, setAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuth = localStorage.getItem('isAuthenticated');
    if (token && isAuth === 'true') {
      setAuth(true);
      navigate('/tasks');
    }
  }, [navigate]);

  const logout =async () => {
    const response = await api.post('auth/logout')
    if(response?.status == 200 ){
      setAuth(false)
      localStorage.setItem('token',null)
      localStorage.setItem('isAuthenticated',false)
      navigate('/login');
    }
  }


  return (
    <nav>
      {isAuthenticated ? (
        <>
        <Link to="/tasks" style={{ margin: '0 10px' }}>Tasks</Link>
        <div style={{cursor:'pointer'}} 
        onClick={logout}
        >Logout</div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        
        <Link to="/register" style={{ margin: '0 10px' }}>
        Register
        </Link>
        <Link to="/login" style={{ margin: '0 10px' }}>
          Login
        </Link>
      </div>
      )}
    </nav>
  );
}

export default Navbar;
