import React,{ useEffect, useState } from 'react';
import api from '../utils/axios'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('ali@gmail.com');
  const [password, setPassword] = useState('Hello@2024');
  const [error, setError] = useState('');


  useEffect(()=>{
    const token = localStorage.getItem('token')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if(token && isAuthenticated === 'true'){
      navigate('/tasks');

    }
  },[])

  const handleSubmit =async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    const response = await api.post('auth/login',{email,password})
    if(response?.status === 200 && response?.data?.tokens?.refresh?.token){
      localStorage.setItem('token',response?.data?.tokens?.refresh?.token)
      localStorage.setItem('isAuthenticated',true)
      navigate('/tasks');
    }
    setError('');
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box'
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '10px'
  }
};

export default LoginForm;
