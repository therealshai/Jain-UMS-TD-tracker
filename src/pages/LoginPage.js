import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usn, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-blue-light">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md">
        <Header />
        <div className="p-6">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="studentCode" className="block text-gray-700">Student Code</label>
              <input
                type="text"
                id="studentCode"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                placeholder="Enter Student USN"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-button-blue text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              LOG IN
            </button>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => alert('Password recovery not implemented')}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const Header = () => {
  return (
    <div className="bg-background-blue p-6 grid grid-cols-2 gap-4 items-center h-43">
      <div className="flex items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-blue-900 whitespace-nowrap">STUDENT LOGIN</h1>
          <p className="text-blue-800 text-pretty">PCL Tracker</p>
        </div>
      </div>
      <div className="flex items-center justify-end h-43">
        <div className="flex items-end h-full">
          <img src="illustration.png" alt="Illustration" className="w-45 h-40 object-cover" />
        </div>
      </div>
    </div>
  );
};



export default LoginPage;
