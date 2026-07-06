// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import MainNavbar from '../components/layout/MainNavbar';
// import { ArrowRight } from 'lucide-react';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <MainNavbar />
      
//       <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-[-8vh]">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
//           Collaborative Code Editing Made Simple
//         </h1>
        
//         <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
//           Write, edit and share code in real-time with your team. No setup required <br className="hidden md:block" /> just open the editor and start coding.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           <button 
//             onClick={() => navigate('/workspace/demo')}
//             className="px-6 py-2.5 text-white bg-[#00a65a] rounded-md font-medium hover:bg-[#008f4d] transition-colors w-full sm:w-auto text-sm"
//           >
//             Try Live Editor
//           </button>
          
//           <button 
//             onClick={() => navigate('/signup')}
//             className="group flex items-center justify-center gap-2 px-6 py-2.5 text-[#00a65a] bg-transparent border border-gray-700 rounded-md font-medium hover:border-[#00a65a] transition-colors w-full sm:w-auto text-sm"
//           >
//             Get Started 
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default LandingPage;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import MainNavbar from '../components/layout/MainNavbar';
// import { ArrowRight } from 'lucide-react';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <MainNavbar />
      
//       <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-[-8vh]">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
//           Collaborative Code Editing Made Simple
//         </h1>
        
//         <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
//           Write, edit and share code in real-time with your team. No setup required <br className="hidden md:block" /> just open the editor and start coding.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           {/* Try Live Editor Button - Ab seedha Signup par bhejega */}
//           <button 
//             onClick={() => navigate('/signup')}
//             className="px-6 py-2.5 text-white bg-[#00a65a] rounded-md font-medium hover:bg-[#008f4d] transition-colors w-full sm:w-auto text-sm"
//           >
//             Try Live Editor
//           </button>
          
//           {/* Get Started Button */}
//           <button 
//             onClick={() => navigate('/signup')}
//             className="group flex items-center justify-center gap-2 px-6 py-2.5 text-[#00a65a] bg-transparent border border-gray-700 rounded-md font-medium hover:border-[#00a65a] transition-colors w-full sm:w-auto text-sm"
//           >
//             Get Started 
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default LandingPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/layout/MainNavbar';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  // ✅ SMART NAVIGATION FUNCTION
  const handleAuthNavigation = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Agar login hai, seedha dashboard
    } else {
      navigate('/signup');    // Agar nahi hai, toh signup
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <MainNavbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-[-8vh]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Collaborative Code Editing Made Simple
        </h1>
        
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Write, edit and share code in real-time with your team. No setup required <br className="hidden md:block" /> just open the editor and start coding.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Try Live Editor Button */}
          <button 
            onClick={handleAuthNavigation}
            className="px-6 py-2.5 text-white bg-[#00a65a] rounded-md font-medium hover:bg-[#008f4d] transition-colors w-full sm:w-auto text-sm"
          >
            Try Live Editor
          </button>
          
          {/* Get Started Button */}
          <button 
            onClick={handleAuthNavigation}
            className="group flex items-center justify-center gap-2 px-6 py-2.5 text-[#00a65a] bg-transparent border border-gray-700 rounded-md font-medium hover:border-[#00a65a] transition-colors w-full sm:w-auto text-sm"
          >
            Get Started 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;