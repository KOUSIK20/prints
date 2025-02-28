import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    sessionStorage.setItem('email',email);
    
    
    console.log('Logging in with:', { email, password });
    setError('');
    navigate('/home'); 
  };

  return (
    <div className='all'>
    <div className="auth-container">
      <h2 >Login</h2>

      <form onSubmit={handleLoginSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default AuthPage;
