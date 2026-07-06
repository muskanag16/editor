// import React, { useState, useEffect } from 'react';
// import api from '../api';

// const SettingsPage = () => {
//   const [stats, setStats] = useState({ totalProjects: 0, createdByYou: 0, collaborated: 0 });
//   const [newPassword, setNewPassword] = useState('');

//   // useEffect(() => {
//   //   api.get('/users/stats').then(res => setStats(res.data));
//   // }, []);
//   useEffect(() => {
//   api.get('/users/stats').then(res => {
//     const allProjects = res.data;
//     const userId = userData?._id; // Apni user ID yahan se lo

//     const owned = allProjects.filter(p => p.owner === userId).length;
//     const collab = allProjects.filter(p => p.owner !== userId).length;
    
//     setStats({
//       totalProjects: allProjects.length,
//       createdByYou: owned,
//       collaborated: collab
//     });
//   });
// }, []);

//   const handleResetPassword = async () => {
//     if (!newPassword) return alert("Enter a new password");
//     try {
//       await api.put('/users/change-password', { newPassword });
//       alert("Password updated!");
//       setNewPassword('');
//     } catch { alert("Failed to reset"); }
//   };

//   return (
//     <div className="p-8 text-white">
//       <h1 className="text-2xl font-bold mb-1">Settings</h1>
//       <p className="text-gray-400 mb-8">Manage your account preferences and security</p>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-3 gap-6 mb-8">
//         {[
//           { label: 'Total projects worked on', val: stats.totalProjects },
//           { label: 'Created by you', val: stats.createdByYou },
//           { label: 'Collaborated projects', val: stats.collaborated }
//         ].map((item, i) => (
//           <div key={i} className="bg-[#161b22] border border-gray-800 p-6 rounded-lg">
//             <div className="text-3xl font-bold">{item.val}</div>
//             <div className="text-sm text-gray-400">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Password Reset Section */}
//       <div className="bg-[#161b22] border border-gray-800 p-6 rounded-lg flex justify-between items-center">
//         <div>
//           <h3 className="font-semibold">Reset password</h3>
//           <input 
//             type="password" 
//             placeholder="Enter new password" 
//             className="bg-[#0d1117] border border-gray-700 p-2 mt-2 rounded w-64 text-sm"
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>
//         <button onClick={handleResetPassword} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Reset</button>
//       </div>
//     </div>
//   );
// };
// export default SettingsPage;
import React, { useState, useEffect } from 'react';
import api from '../api';

const SettingsPage = () => {
  const [stats, setStats] = useState({ totalProjects: 0, createdByYou: 0, collaborated: 0 });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // 1. User Data yahan extract karo
    const storedData = sessionStorage.getItem('user') || localStorage.getItem('user');
    let userId = '';
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        userId = parsed.user ? parsed.user._id : parsed._id; 
      } catch (e) {
        console.error("Error parsing user data");
      }
    }

    // 2. Stats fetch karo aur calculation karo
    if (userId) {
      api.get('/users/stats').then(res => {
        const allProjects = res.data; // Yeh puri project list hai
        
        const owned = allProjects.filter(p => p.owner === userId).length;
        const collab = allProjects.filter(p => p.owner !== userId).length;
        
        setStats({
          totalProjects: allProjects.length,
          createdByYou: owned,
          collaborated: collab
        });
      });
    }
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword) return alert("Enter a new password");
    try {
      await api.put('/users/change-password', { newPassword });
      alert("Password updated!");
      setNewPassword('');
    } catch { alert("Failed to reset"); }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-gray-400 mb-8">Manage your account preferences and security</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total projects worked on', val: stats.totalProjects },
          { label: 'Created by you', val: stats.createdByYou },
          { label: 'Collaborated projects', val: stats.collaborated }
        ].map((item, i) => (
          <div key={i} className="bg-[#161b22] border border-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold">{item.val}</div>
            <div className="text-sm text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Password Reset Section */}
      <div className="bg-[#161b22] border border-gray-800 p-6 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Reset password</h3>
          <input 
            type="password" 
            placeholder="Enter new password" 
            className="bg-[#0d1117] border border-gray-700 p-2 mt-2 rounded w-64 text-sm"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <button onClick={handleResetPassword} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Reset</button>
      </div>
    </div>
  );
};
export default SettingsPage;