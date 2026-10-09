import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState<'applicant' | 'advisor'>('applicant');
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isLoginMode && password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    
    try {
      if (isLoginMode) {
        // Login
        await axios.post('http://localhost:3000/auth/login', {
          email,
          password
        });
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);
        if (role === 'applicant') {
          navigate('/dashboard');
        } else {
          navigate('/advisor-dashboard'); 
        }
      } else {
        // Register
        await axios.post('http://localhost:3000/auth/register', {
          email,
          password,
          role: role.toUpperCase(),
          name
        });
        setIsLoginMode(true);
        alert('Account created successfully! Please log in.');
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Authentication failed');
    }
  };

  const isApplicant = role === 'applicant';

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-500 bg-cover bg-center bg-no-repeat relative ${isApplicant ? 'bg-[url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop")]' : 'bg-[url("https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop")]'}`}>
      
      {/* Dark overlay for background image */}
      <div className={`absolute inset-0 backdrop-blur-sm transition-colors duration-500 ${isApplicant ? 'bg-slate-900/60' : 'bg-indigo-900/70'}`}></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg transition-colors duration-500 ${isApplicant ? 'bg-blue-600' : 'bg-indigo-600'}`}>
            {isApplicant ? (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            )}
          </div>
          <h2 className="mt-2 text-center text-4xl font-extrabold text-white tracking-tight">
            {isApplicant ? 'Educaro Pathfinder' : 'Advisor Portal'}
          </h2>
          <p className={`mt-2 text-center text-sm ${isApplicant ? 'text-blue-200' : 'text-indigo-200'}`}>
            {isApplicant ? 'Your AI Agent for studying and working in Germany' : 'Manage applicants and applications securely'}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-100">
          
          {/* Role Toggle Switch */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setRole('applicant')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${isApplicant ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Applicant
            </button>
            <button
              type="button"
              onClick={() => setRole('advisor')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${!isApplicant ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Advisor
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold border border-red-200">
                {errorMsg}
              </div>
            )}
            
            {/* Show Full Name field only in Sign Up mode */}
            {!isLoginMode && (
              <div className="animate-fade-in">
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${isApplicant ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                {isApplicant ? 'Email address' : 'Work Email'}
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${isApplicant ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-indigo-500 focus:border-indigo-500'}`}
                  placeholder={isApplicant ? 'you@example.com' : 'advisor@educaro.com'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${isApplicant ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-indigo-500 focus:border-indigo-500'}`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Show Confirm Password field only in Sign Up mode */}
            {!isLoginMode && (
              <div className="animate-fade-in">
                <label className="block text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${isApplicant ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLoginMode && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 border-slate-300 rounded cursor-pointer ${isApplicant ? 'text-blue-600 focus:ring-blue-500' : 'text-indigo-600 focus:ring-indigo-500'}`}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className={`font-semibold transition-colors ${isApplicant ? 'text-blue-600 hover:text-blue-500' : 'text-indigo-600 hover:text-indigo-500'}`}>
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all hover:scale-[1.02] ${isApplicant ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
              >
                {isLoginMode 
                  ? (isApplicant ? 'Sign In as Applicant' : 'Sign In as Advisor') 
                  : (isApplicant ? 'Create Applicant Account' : 'Create Advisor Account')
                }
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)} 
              className={`font-bold hover:underline ${isApplicant ? 'text-blue-600' : 'text-indigo-600'}`}
            >
              {isLoginMode ? "Sign up" : "Sign in"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
