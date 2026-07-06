// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import MainNavbar from '../components/layout/MainNavbar';
//   import { GoogleLogin } from '@react-oauth/google';
// import api from '../api';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const handleGoogleSignup = async (credentialResponse) => {
//   try {
//     // Backend ko Google token bhejen
//     const res = await api.post('/auth/google', {
//       token: credentialResponse.credential
//     });

//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('user', JSON.stringify(res.data.user));
    
//     navigate('/dashboard');
//   } catch (error) {
//     console.error("Google Signup Error:", error);
//     alert("Google authentication failed!");
//   }
// };
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainNavbar from '../components/layout/MainNavbar';
import { GoogleLogin } from '@react-oauth/google'; // Saare imports upar
import api from '../api';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function yahan hai (Import yahan mat likhna!)
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await api.post('/auth/google', {
        token: credentialResponse.credential
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
//       sessionStorage.setItem('token', response.data.token);
// sessionStorage.setItem('user', JSON.stringify(response.data.user || response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error("Google Signup Error:", error);
      alert("Google authentication failed!");
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Backend par data bhej rahe hain
      const response = await api.post('/auth/signup', { name, email, password });
      
      // Agar success hua, toh token aur user data save kar lenge
    //   localStorage.setItem('token', response.data.token);
    //   localStorage.setItem('user', JSON.stringify(response.data));
        sessionStorage.setItem('token', response.data.token);
sessionStorage.setItem('user', JSON.stringify(response.data.user || response.data));
      alert('Account successfully created!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Signup Error:', error);
      alert(error.response?.data?.message || 'Something went wrong during signup');
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <MainNavbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#161b22] border border-gray-800 rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create your CoDevSpace account</h2>
            <p className="text-sm text-gray-400">
              Start coding together — join projects, connect with your team, and build collaboratively.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#00a65a] text-white font-medium py-2 rounded-md hover:bg-[#008f4d] transition-colors mt-2"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
          </p>

          {/* <div className="mt-6 flex items-center justify-between gap-3">
           <div className="flex justify-center mt-4">
  <GoogleLogin
    onSuccess={handleGoogleSignup}
    onError={() => console.log('Login Failed')}
    theme="filled_black"
    size="large"
    text="signup_with"
    shape="rectangular"
    width="384px" // Aapke container ki width
  />
</div>
            <button className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors">
           <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="20" 
  height="20" 
  fill="currentColor" 
  viewBox="0 0 24 24"
>
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>
              Continue with GitHub
            </button>
          </div> */}
         {/* Google & GitHub Buttons */}
<div className="mt-6 flex flex-col gap-3 w-full items-center">
  
  {/* Google Login Wrapper - Force width with a style object */}
  <div className="w-full flex justify-center" style={{ minWidth: '300px' }}>
    <GoogleLogin
      onSuccess={handleGoogleSignup}
      onError={() => console.log('Login Failed')}
      theme="filled_black"
      size="large"
      text="signup_with"
      shape="rectangular"
      //width="100%" // Agar ye kaam na kare toh niche wala style use karo
    />
  </div>

  {/* GitHub Button - Force same width manually */}
  <button 
    className="flex justify-center items-center gap-3 bg-transparent border border-gray-700 text-sm text-gray-300 py-3 rounded-md hover:bg-gray-800 transition-colors"
    style={{ width: '100%', maxWidth: '384px' }} // Google button ki standard width 384px hoti hai
  >
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    Continue with GitHub
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;