// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2} from 'lucide-react';

// const MainNavbar = () => {
//   const navigate = useNavigate();

//   return (
//     // <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0d1117]">
//     <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0d1117]">
//       {/* Logo Section */}
//       <div 
//         className="flex items-center gap-2 cursor-pointer" 
//         onClick={() => navigate('/')}
//       >
//         <Code2 className="text-[#00a65a]" size={28} />
//         <span className="text-xl font-bold text-white tracking-wide">CoDevSpace</span>
//       </div>

//       {/* Right Actions */}
//       <div className="flex items-center gap-4">
//         <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
//      <svg 
//   xmlns="http://www.w3.org/2000/svg" 
//   width="20" 
//   height="20" 
//   fill="currentColor" 
//   viewBox="0 0 24 24"
// >
//   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
// </svg>
//         </a>
//         <button 
//           onClick={() => navigate('/login')}
//           className="px-4 py-1.5 text-sm font-medium text-[#00a65a] border border-[#00a65a] rounded-md hover:bg-[#00a65a]/10 transition-colors"
//         >
//           Log In
//         </button>
//         <button 
//           onClick={() => navigate('/signup')}
//           className="px-4 py-1.5 text-sm font-medium text-white bg-[#00a65a] rounded-md hover:bg-[#008f4d] transition-colors"
//         >
//           Sign Up
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default MainNavbar;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {
  const navigate = useNavigate();
  
  // 1. Auth check
  const isAuthenticated = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  
  // 2. User Data parse karna
  let userData = {};
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      // Agar backend se data { user: {...} } format mein aata hai
      userData = parsed.user ? parsed.user : parsed; 
    } catch (e) {
      console.error("Error parsing user data");
    }
  }

  // 3. Name aur Initial set karna
  const displayUserName = userData?.name || 'Profile';
  const userInitial = displayUserName !== 'Profile' ? displayUserName.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="flex items-center justify-between px-8 py-4 w-full bg-[#0d1117] border-b border-gray-800">
      <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate('/')}>
        <span className="text-xl font-bold text-white">CoDevSpace</span>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          // AGAR LOGGED IN HAI: Profile Icon aur Name dikhao
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer hover:bg-[#161b22] px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-gray-700"
            title="Go to Dashboard"
          >
            {/* Chhota sa Profile Icon */}
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
              {userInitial}
            </div>
            {/* User ka actual naam */}
            <span className="text-sm font-medium text-gray-300">
              {displayUserName}
            </span>
          </div>
        ) : (
          // AGAR LOGGED IN NAHI HAI: Toh Login/Signup dikhao
          <>
            <button 
              onClick={() => navigate('/login')} 
              className="text-gray-300 hover:text-white text-sm"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="px-4 py-2 bg-[#00a65a] text-white rounded-md text-sm hover:bg-[#008f4d] transition-colors"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;