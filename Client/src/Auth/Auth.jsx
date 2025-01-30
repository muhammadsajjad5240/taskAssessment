import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!token || isAuth !== 'true') {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // If authenticated, render children (the protected component)
  return <>{children}</>;
};

export default Auth;
