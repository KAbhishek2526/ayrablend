import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-8 max-w-md mx-auto">
      <div className="bg-surface p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif text-primary mb-6 text-center">Create Account</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-center">
            <h3 className="font-semibold text-lg mb-2">Registration Successful!</h3>
            <p className="text-sm">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block text-text-light mb-2 text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-text-light mb-2 text-sm font-medium">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="hello@ayurablend.com"
              />
            </div>

            <div>
              <label className="block text-text-light mb-2 text-sm font-medium">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white px-8 py-3 rounded-md transition-colors text-center font-medium mt-2 ${loading ? 'bg-primary/70 cursor-wait' : 'bg-primary hover:bg-primary-dim'}`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        )}

        <p className="text-center text-text-light mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
