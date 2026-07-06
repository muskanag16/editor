// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import MainNavbar from '../components/layout/MainNavbar';
// // import { Github } from 'lucide-react';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Yahan API call hoga (baad mein jodeinge)
//     console.log('Login logic here', { email, password });
//     navigate('/dashboard'); 
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <MainNavbar />
      
//       <div className="flex-1 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-[#161b22] border border-gray-800 rounded-xl p-8 shadow-2xl">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-white mb-2">Log in to CoDevSpace</h2>
//             <p className="text-sm text-gray-400">
//               Access your projects, join your team, and start coding together.
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//               <input 
//                 type="email" 
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//               <input 
//                 type="password" 
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
//                 required
//               />
//             </div>

//             <button 
//               type="submit"
//               className="w-full bg-[#00a65a] text-white font-medium py-2 rounded-md hover:bg-[#008f4d] transition-colors mt-2"
//             >
//               Log in
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
//           </div>

//           <div className="mt-6 flex items-center justify-between gap-3">
//             <button className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
//               Continue with Google
//             </button>
//             <button className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors">
// <svg 
//   xmlns="http://www.w3.org/2000/svg" 
//   width="20" 
//   height="20" 
//   fill="currentColor" 
//   viewBox="0 0 24 24"
// >
//   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
// </svg>
//               Continue with GitHub
//             </button>
//           </div>

//           <p className="text-center text-sm text-gray-400 mt-6">
//             New to CoDevSpace? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import MainNavbar from '../components/layout/MainNavbar';
// import api from '../api'; // Backend se connect karne ke liye hamara api instance

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Loading state add ki
//   const navigate = useNavigate();

//   // ASLI LOGIN LOGIC (Hits your Node.js Backend)
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Backend par login data bhej rahe hain
//       const response = await api.post('/auth/login', { email, password });
      
//       // Agar login successful hua, toh token aur user data save kar lenge
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data));
// //         sessionStorage.setItem('token', response.data.token);
// // sessionStorage.setItem('user', JSON.stringify(response.data.user || response.data));
//       // Dashboard par bhej do
//       navigate('/dashboard'); 
//     } catch (error) {
//       console.error('Login Error:', error);
//       // Agar galat password/email dala toh alert dikhayega
//       alert(error.response?.data?.message || 'Invalid email or password. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <MainNavbar />
      
//       <div className="flex-1 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-[#161b22] border border-gray-800 rounded-xl p-8 shadow-2xl">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-white mb-2">Log in to CoDevSpace</h2>
//             <p className="text-sm text-gray-400">
//               Access your projects, join your team, and start coding together.
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//               <input 
//                 type="email" 
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//               <input 
//                 type="password" 
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] focus:ring-1 focus:ring-[#00a65a] transition-all"
//                 required
//               />
//             </div>

//             <button 
//               type="submit"
//               disabled={isLoading}
//               className={`w-full text-white font-medium py-2 rounded-md transition-colors mt-2 ${
//                 isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d]'
//               }`}
//             >
//               {isLoading ? 'Logging in...' : 'Log in'}
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
//           </div>

//           <div className="mt-6 flex items-center justify-between gap-3">
//             <button className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors">
//               <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
//               Continue with Google
//             </button>
//             <button className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors">
// <svg 
//   xmlns="http://www.w3.org/2000/svg" 
//   width="20" 
//   height="20" 
//   fill="currentColor" 
//   viewBox="0 0 24 24"
// >
//   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
// </svg>
//               Continue with GitHub
//             </button>
//           </div>

//           <p className="text-center text-sm text-gray-400 mt-6">
//             New to CoDevSpace? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google'; // 👈 Naya Import
import MainNavbar from '../components/layout/MainNavbar';
import api from '../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 1. ASLI LOGIN LOGIC (Email/Password)
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. NAYA LOGIC: Google Login Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Google se token milne ke baad apne backend ko bhejein verify/login karne ke liye
        const response = await api.post('/auth/google', {
          access_token: tokenResponse.access_token,
        });

        // Backend verify karke humein apna JWT token dega
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Google Auth Error:', error);
        alert('Google authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google Login Failed', error);
      alert('Could not connect to Google.');
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <MainNavbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#161b22] border border-gray-800 rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Log in to CoDevSpace</h2>
            <p className="text-sm text-gray-400">
              Access your projects, join your team, and start coding together.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="you@example.com"
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
              disabled={isLoading}
              className={`w-full text-white font-medium py-2 rounded-md transition-colors mt-2 ${
                isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d]'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            {/* 👇 YAHAN GOOGLE LOGIN ATTACH KIYA HAI 👇 */}
            <button 
              type="button"
              onClick={() => handleGoogleLogin()} 
              disabled={isLoading}
              className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
              Continue with Google
            </button>
            
            <button type="button" className="flex-1 flex justify-center items-center gap-2 bg-transparent border border-gray-700 text-sm text-gray-300 py-2 rounded-md hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            New to CoDevSpace? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;