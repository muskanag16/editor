// import React from 'react';
// import { Clock, Folder, Bell, Users, FileText, Settings, LogOut } from 'lucide-react';

// const DashboardSidebar = ({ activeTab, setActiveTab }) => {
//   const menuItems = [
//     { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
//     { id: 'all', label: 'All Repository', icon: <Folder size={18} /> },
//     { id: 'invitations', label: 'Invitations', icon: <Bell size={18} /> },
//     { id: 'shared', label: 'Shared with me', icon: <Users size={18} /> },
//     { id: 'templates', label: 'Templates', icon: <FileText size={18} /> },
//     { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
//   ];

//   return (
//     <div className="w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col h-full">
//       {/* Top Navigation */}
//       <div className="flex-1 py-6 space-y-1">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setActiveTab(item.id)}
//             className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
//               activeTab === item.id 
//                 ? 'bg-[#161b22] text-[#00a65a] border-l-2 border-[#00a65a]' 
//                 : 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]/50 border-l-2 border-transparent'
//             }`}
//           >
//             {item.icon}
//             {item.label}
//           </button>
//         ))}
//       </div>

//       {/* User Profile & Logout (Bottom) */}
//       <div className="p-4 border-t border-gray-800">
//         <div className="flex items-center gap-3 mb-4 px-2">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             Z
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-medium text-white">zwzw</span>
//             <span className="text-xs text-gray-500 truncate w-32">addictuser@gmail....</span>
//           </div>
//         </div>
//         <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#00a65a] border border-[#00a65a] rounded-md hover:bg-[#00a65a]/10 transition-colors">
//           <LogOut size={16} />
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardSidebar;
// import React from 'react';
// import { Clock, Folder, Bell, Users, FileText, Settings, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const DashboardSidebar = ({ activeTab, setActiveTab }) => {
//   const navigate = useNavigate();

//   // Local storage se asli user data nikalna
//   const userString = localStorage.getItem('user');
//   const user = userString ? JSON.parse(userString) : {};
  
//   // Agar user ka data nahi milta (just in case), toh default values
//   const userName = user?.name || 'Guest User';
//   const userEmail = user?.email || 'guest@codevspace.com';
//   // Naam ka pehla letter avatar ke liye
//   const userInitial = userName.charAt(0).toUpperCase();

//   // Logout function
//   const handleLogout = () => {
//     // Local storage se token aur user data hata do
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     // Wapas login page par bhej do
//     navigate('/login');
//   };

//   const menuItems = [
//     { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
//     { id: 'all', label: 'All Repository', icon: <Folder size={18} /> },
//     { id: 'invitations', label: 'Invitations', icon: <Bell size={18} /> },
//     { id: 'shared', label: 'Shared with me', icon: <Users size={18} /> },
//     { id: 'templates', label: 'Templates', icon: <FileText size={18} /> },
//     { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
//   ];

//   return (
//     <div className="w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col h-full">
//       {/* Top Navigation */}
//       <div className="flex-1 py-6 space-y-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setActiveTab(item.id)}
//             className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
//               activeTab === item.id 
//                 ? 'bg-[#161b22] text-[#00a65a] border-l-2 border-[#00a65a]' 
//                 : 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]/50 border-l-2 border-transparent'
//             }`}
//           >
//             {item.icon}
//             {item.label}
//           </button>
//         ))}
//       </div>

//       {/* User Profile & Logout (Bottom) */}
//       <div className="p-4 border-t border-gray-800">
//         <div className="flex items-center gap-3 mb-4 px-2">
//           {/* Dynamic Avatar */}
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
//             {userInitial}
//           </div>
//           {/* Dynamic Name and Email */}
//           <div className="flex flex-col overflow-hidden">
//             <span className="text-sm font-medium text-white truncate">{userName}</span>
//             <span className="text-xs text-gray-500 truncate">{userEmail}</span>
//           </div>
//         </div>
        
//         {/* Functional Sign Out Button */}
//         <button 
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#00a65a] border border-[#00a65a] rounded-md hover:bg-[#00a65a]/10 transition-colors"
//         >
//           <LogOut size={16} />
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardSidebar;
// import React from 'react';
// import { Clock, Folder, Bell, Users, FileText, Settings, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Prop mein onOpenModal add kiya gaya hai
// const DashboardSidebar = ({ activeTab, setActiveTab, onOpenModal }) => {
//   const navigate = useNavigate();

//   const userString = localStorage.getItem('user');
//   const user = userString ? JSON.parse(userString) : {};
  
//   const userName = user?.name || 'Guest User';
//   const userEmail = user?.email || 'guest@codevspace.com';
//   const userInitial = userName.charAt(0).toUpperCase();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const menuItems = [
//     { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
//     { id: 'all', label: 'All Repository', icon: <Folder size={18} /> },
//     { id: 'invitations', label: 'Invitations', icon: <Bell size={18} /> },
//     { id: 'shared', label: 'Shared with me', icon: <Users size={18} /> },
//     { id: 'templates', label: 'Templates', icon: <FileText size={18} /> },
//     { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
//   ];

//   return (
//     <div className="w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col h-full">
//       <div className="flex-1 py-6 space-y-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => {
//               setActiveTab(item.id); // Tab ko active green color dene ke liye
//               // LOGIC: Agar templates par click hua, toh Modal open kar do!
//               if (item.id === 'templates' && onOpenModal) {
//                 onOpenModal();
//               }
//             }}
//             className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
//               activeTab === item.id 
//                 ? 'bg-[#161b22] text-[#00a65a] border-l-2 border-[#00a65a]' 
//                 : 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]/50 border-l-2 border-transparent'
//             }`}
//           >
//             {item.icon}
//             {item.label}
//           </button>
//         ))}
//       </div>

//       <div className="p-4 border-t border-gray-800">
//         <div className="flex items-center gap-3 mb-4 px-2">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
//             {userInitial}
//           </div>
//           <div className="flex flex-col overflow-hidden">
//             <span className="text-sm font-medium text-white truncate">{userName}</span>
//             <span className="text-xs text-gray-500 truncate">{userEmail}</span>
//           </div>
//         </div>
        
//         <button 
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#00a65a] border border-[#00a65a] rounded-md hover:bg-[#00a65a]/10 transition-colors"
//         >
//           <LogOut size={16} />
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardSidebar;
import React from 'react';
import { Clock, Folder, Bell, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ activeTab, setActiveTab, onOpenModal }) => {
  const navigate = useNavigate();

  // 👇 FIX 1: Navbar jaisa robust logic jo nested object aur dono storage handle karega
  const storedData = sessionStorage.getItem('user') || localStorage.getItem('user');
  let userData = {};
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      userData = parsed.user ? parsed.user : parsed; 
    } catch (e) {
      console.error("Error parsing user data in sidebar");
    }
  }
  
  const userName = userData?.name || 'Guest User';
  const userEmail = userData?.email || 'guest@codevspace.com';
  const userInitial = userName !== 'Guest User' ? userName.charAt(0).toUpperCase() : 'G';

  // 👇 FIX 2: Logout karne par ab browser ka saara kachra saaf ho jayega
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login'; // Yeh direct refresh marega taaki purana state na bache
  };
// localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('token');

//     // 2. User ko Landing page ya Login page par bhejein
//     navigate('/');
//   };
  const menuItems = [
    { id: 'recent', label: 'Recent', icon: <Clock size={18} /> },
    { id: 'all', label: 'All Repository', icon: <Folder size={18} /> },
    { id: 'invitations', label: 'Invitations', icon: <Bell size={18} /> },
    { id: 'shared', label: 'Shared with me', icon: <Users size={18} /> },
    { id: 'templates', label: 'Templates', icon: <FileText size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col h-full">
      <div className="flex-1 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id); 
              if (item.id === 'templates' && onOpenModal) {
                onOpenModal();
              }
            }}
            className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-[#161b22] text-[#00a65a] border-l-2 border-[#00a65a]' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]/50 border-l-2 border-transparent'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {userInitial}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-white truncate">{userName}</span>
            <span className="text-xs text-gray-500 truncate">{userEmail}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#00a65a] border border-[#00a65a] rounded-md hover:bg-[#00a65a]/10 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;