import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { loginContext } = useContext(AuthContext);

  const infoMessage = location.state?.message || '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password);
      // Pass the user object and Token into the Context state
      loginContext(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-8 max-w-md mx-auto">
      <div className="bg-surface p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif text-primary mb-6 text-center">Welcome Back</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {infoMessage && !error && (
          <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 rounded-md mb-6 text-sm text-center font-medium">
            {infoMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-text-light mb-2 text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="hello@ayurablend.com"
            />
          </div>

          <div>
            <label className="block text-text-light mb-2 text-sm font-medium">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white px-8 py-3 rounded-md transition-all text-center font-medium mt-2 flex items-center justify-center gap-2 ${loading ? 'bg-primary/60 cursor-not-allowed scale-[0.98]' : 'bg-primary hover:bg-primary-dim shadow-sm'}`}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-text-light mt-6 text-sm">
          New to AyuraBlend? <Link to="/register" className="text-primary font-medium hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
