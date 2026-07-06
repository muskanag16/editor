// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2 } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       {/* Top Navbar specifically for Dashboard */}
//       <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             Z
//           </div>
//           <span className="text-sm font-medium text-gray-300">addictuser</span>
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           {/* Header Row */}
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">
//                 {activeTab === 'recent' && 'Recent'}
//                 {activeTab === 'settings' && 'Settings'}
//               </h1>
//               <p className="text-sm text-gray-400">
//                 {activeTab === 'recent' && 'Your most recently updated projects'}
//                 {activeTab === 'settings' && 'Manage your account preferences and security'}
//               </p>
//             </div>
            
//             {activeTab !== 'settings' && (
//               <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2"
//               >
//                 <span>⊕</span> New Project
//               </button>
//             )}
//           </div>

//           {/* Conditional Rendering based on Tab */}
//           {activeTab === 'recent' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Project Card */}
//               <div 
//                 onClick={() => navigate('/workspace/demo-123')}
//                 className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors"
//               >
//                 <h3 className="text-white font-bold text-lg mb-4">CodeProject_1</h3>
//                 <div className="space-y-2 text-sm text-gray-400">
//                   <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: C++</p>
//                   <p className="flex items-center gap-2"><span>✎</span> Permission: Owner</p>
//                   <p className="flex items-center gap-2"><span>👤</span> Created by zwzw</p>
//                   <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800"><span>⏱</span> 13 minutes ago</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'settings' && (
//             <div className="space-y-8 max-w-4xl">
//               <div>
//                 <h3 className="text-white font-medium mb-4">Account Overview</h3>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
//                     <div className="text-2xl font-bold text-white mb-1">1</div>
//                     <div className="text-sm text-gray-400">Total projects worked on</div>
//                   </div>
//                   <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
//                     <div className="text-2xl font-bold text-white mb-1">1</div>
//                     <div className="text-sm text-gray-400">Created by you</div>
//                   </div>
//                   <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
//                     <div className="text-2xl font-bold text-white mb-1">0</div>
//                     <div className="text-sm text-gray-400">Collaborated projects</div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-white font-medium mb-4">Account Settings</h3>
//                 <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 flex items-center justify-between">
//                   <div>
//                     <div className="text-white font-medium">Reset password</div>
//                     <div className="text-sm text-gray-400">Secure your account with a new password</div>
//                   </div>
//                   <button className="px-4 py-1.5 border border-gray-700 text-gray-300 rounded hover:bg-gray-800 text-sm">
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// };

// export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2, Loader2, FolderOpen } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';

// import api from '../api'; // Backend connection

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects, setProjects] = useState([]); // Dynamic projects list
//   const [isLoading, setIsLoading] = useState(true);
//   const [invitations, setInvitations] = useState([]);
//   const navigate = useNavigate();

//   // Local storage se logged-in user ka data nikalna
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

//   // Component load hote hi backend se saare projects mangwao
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);
//   useEffect(() => {
//   if (activeTab === 'invitations') {
//     const fetchInvites = async () => {
//       try {
//         const res = await api.get('/invitations/my-invitations');
//         setInvitations(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchInvites();
//   }
// }, [activeTab]);


//   // Modal se naya project aane par list update karna (bina refresh kiye)
//   const handleProjectCreated = (newProject) => {
//     setProjects([newProject, ...projects]);
//   };
//   const handleInvitationResponse = async (id, action) => {
//   try {
//     await api.put(`/invitations/respond/${id}`, { action });
//     // List se hata do respond karne ke baad
//     setInvitations(invitations.filter(invite => invite._id !== id));
//     alert(`Invitation ${action}!`);
//   } catch (err) {
//     alert("Action failed");
//   }
// };

//   // Helper function: Date format karne ke liye
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             {userInitial}
//           </div>
//           <span className="text-sm font-medium text-gray-300">{user.name || 'User'}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         {/* <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
//         <DashboardSidebar 
//   activeTab={activeTab} 
//   setActiveTab={setActiveTab} 
//   onOpenModal={() => setIsModalOpen(true)}  
// />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">
//                 {activeTab === 'recent' && 'Recent'}
//                 {activeTab === 'all' && 'All Repository'}
//               </h1>
//               <p className="text-sm text-gray-400">
//                 {activeTab === 'recent' && 'Your most recently updated projects'}
//                 {activeTab === 'all' && 'All your projects and templates'}
//               </p>
//             </div>
            
//             <button 
//               onClick={() => setIsModalOpen(true)}
//               className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2"
//             >
//               <span>⊕</span> New Project
//             </button>
//           </div>

//           {(activeTab === 'recent' || activeTab === 'all') && (
//             isLoading ? (
//               <div className="flex items-center justify-center py-20 text-gray-400">
//                 <Loader2 size={32} className="animate-spin text-[#00a65a] mr-3" />
//                 <span>Loading your projects...</span>
//               </div>
//             ) : projects.length === 0 ? (
//               // 0 Projects UI State
//               <div className="flex flex-col items-center justify-center py-24 bg-[#161b22] border border-gray-800 rounded-lg border-dashed">
//                 <FolderOpen size={48} className="text-gray-600 mb-4" />
//                 <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
//                 <p className="text-sm text-gray-400 mb-6 text-center max-w-md">
//                   You haven't created any projects yet. Click the button below to start your first coding project.
//                 </p>
//                 <button 
//                   onClick={() => setIsModalOpen(true)}
//                   className="px-4 py-2 bg-transparent border border-[#00a65a] text-[#00a65a] text-sm font-medium rounded-md hover:bg-[#00a65a]/10 transition-colors"
//                 >
//                   Create your first project
//                 </button>
//               </div>
//             ) : (
//               // Dynamic Projects Grid UI
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {projects.map((project) => (
//                   <div 
//                     key={project._id}
//                     onClick={() => navigate(`/workspace/${project._id}`)}
//                     className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors flex flex-col h-full"
//                   >
//                     <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
//                     <p className="text-xs text-gray-500 mb-4 line-clamp-1">{project.description || 'No description provided'}</p>
                    
//                     <div className="space-y-2 text-sm text-gray-400 mt-auto">
//                       <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: <span className="uppercase text-gray-300">{project.language}</span></p>
//                       <p className="flex items-center gap-2"><span>✎</span> Permission: Owner</p>
//                       <p className="flex items-center gap-2"><span>👤</span> Created by {user.name || 'You'}</p>
//                       <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs">
//                         <span>⏱</span> Updated {formatDate(project.updatedAt)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           )}
//         </main>
//       </div>

//       <CreateProjectModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onProjectCreated={handleProjectCreated}
//       />
//     </div>
//   );
// };

// export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2, Loader2, FolderOpen } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';
// import api from '../api';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [invitations, setInvitations] = useState([]);
//   const navigate = useNavigate();

//   const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//   const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

//   // Fetch Projects
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   // Fetch Invitations
//   useEffect(() => {
//     if (activeTab === 'invitations') {
//       const fetchInvites = async () => {
//         try {
//           const res = await api.get('/invitations/my-invitations');
//           setInvitations(res.data);
//         } catch (err) {
//           console.error("Error fetching invites:", err);
//         }
//       };
//       fetchInvites();
//     }
//   }, [activeTab]);

//   const handleProjectCreated = (newProject) => {
//     setProjects([newProject, ...projects]);
//   };

//   const handleInvitationResponse = async (id, action) => {
//     try {
//       await api.put(`/invitations/respond/${id}`, { action });
//       setInvitations(invitations.filter(invite => invite._id !== id));
//       alert(`Invitation ${action}!`);
//     } catch (err) {
//       alert("Action failed");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             {userInitial}
//           </div>
//           <span className="text-sm font-medium text-gray-300">{user.name || 'User'}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         <DashboardSidebar 
//           activeTab={activeTab} 
//           setActiveTab={setActiveTab} 
//           onOpenModal={() => setIsModalOpen(true)}  
//         />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">
//                 {activeTab === 'recent' && 'Recent Projects'}
//                 {activeTab === 'all' && 'All Repository'}
//                 {activeTab === 'invitations' && 'Invitations'}
//               </h1>
//             </div>
            
//             {(activeTab === 'recent' || activeTab === 'all') && (
//               <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors"
//               >
//                 + New Project
//               </button>
//             )}
//           </div>

//           {/* Projects View */}
//           {(activeTab === 'recent' || activeTab === 'all') && (
//             isLoading ? <div className="text-gray-400">Loading...</div> : 
//             projects.length === 0 ? <div className="text-gray-500">No projects yet.</div> :
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {projects.map((p) => (
//                 <div key={p._id} onClick={() => navigate(`/workspace/${p._id}`)} className="bg-[#161b22] border border-gray-800 p-5 rounded-lg cursor-pointer">
//                   <h3 className="text-white font-bold">{p.title}</h3>
//                   <p className="text-xs text-gray-500">{formatDate(p.updatedAt)}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Invitations View */}
//           {activeTab === 'invitations' && (
//             <div className="space-y-4">
//               {invitations.length === 0 ? (
//                 <p className="text-gray-400">No pending invitations.</p>
//               ) : (
//                 invitations.map((invite) => (
//                   <div key={invite._id} className="bg-[#161b22] border border-gray-700 p-4 rounded-lg flex justify-between items-center text-white">
//                     <div>
//                       <p className="font-semibold">Project: {invite.project?.title || 'Project'}</p>
//                       <p className="text-sm text-gray-400">From: {invite.sender?.email}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => handleInvitationResponse(invite._id, 'accepted')} className="bg-[#00a65a] px-3 py-1 rounded text-sm">Accept</button>
//                       <button onClick={() => handleInvitationResponse(invite._id, 'declined')} className="bg-red-600 px-3 py-1 rounded text-sm">Decline</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </main>
//       </div>

//       <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectCreated={handleProjectCreated} />
//     </div>
//   );
// };

// export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2, Loader2, FolderOpen } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';
// import api from '../api';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [invitations, setInvitations] = useState([]);
//   const navigate = useNavigate();

//   const user = JSON.parse(sessionStorage.getItem('user') || '{}');
//   const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'invitations') {
//       const fetchInvites = async () => {
//         try {
//           const res = await api.get('/invitations/my-invitations');
//           setInvitations(res.data);
//         } catch (err) {
//           console.error("Error fetching invites:", err);
//         }
//       };
//       fetchInvites();
//     }
//   }, [activeTab]);

//   const handleProjectCreated = (newProject) => {
//     setProjects([newProject, ...projects]);
//   };

//   const handleInvitationResponse = async (id, action) => {
//     try {
//       await api.put(`/invitations/respond/${id}`, { action });
//       setInvitations(invitations.filter(invite => invite._id !== id));
//       alert(`Invitation ${action}!`);
//     } catch (err) {
//       alert("Action failed");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             {userInitial}
//           </div>
//           <span className="text-sm font-medium text-gray-300">{user.name || 'User'}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenModal={() => setIsModalOpen(true)} />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">
//                 {activeTab === 'recent' && 'Recent'}
//                 {activeTab === 'all' && 'All Repository'}
//                 {activeTab === 'invitations' && 'Invitations'}
//               </h1>
//               <p className="text-sm text-gray-400">
//                 {activeTab === 'recent' && 'Your most recently updated projects'}
//                 {activeTab === 'all' && 'All your projects and templates'}
//                 {activeTab === 'invitations' && 'Manage your project collaborations'}
//               </p>
//             </div>
//             {(activeTab === 'recent' || activeTab === 'all') && (
//               <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2">
//                 <span>⊕</span> New Project
//               </button>
//             )}
//           </div>

//           {/* Projects Grid */}
//           {(activeTab === 'recent' || activeTab === 'all') && (
//             isLoading ? (
//               <div className="flex items-center justify-center py-20 text-gray-400">
//                 <Loader2 size={32} className="animate-spin text-[#00a65a] mr-3" />
//                 <span>Loading your projects...</span>
//               </div>
//             ) : projects.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-24 bg-[#161b22] border border-gray-800 rounded-lg border-dashed">
//                 <FolderOpen size={48} className="text-gray-600 mb-4" />
//                 <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {projects.map((p) => (
//                   <div key={p._id} onClick={() => navigate(`/workspace/${p._id}`)} className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors flex flex-col h-full">
//                     <h3 className="text-white font-bold text-lg mb-1">{p.title}</h3>
//                     <p className="text-xs text-gray-500 mb-4 line-clamp-1">{p.description || 'No description provided'}</p>
//                     <div className="space-y-2 text-sm text-gray-400 mt-auto">
//                       <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: <span className="uppercase text-gray-300">{p.language}</span></p>
//                       <p className="flex items-center gap-2"><span>👤</span> Created by {user.name || 'You'}</p>
//                       <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs"><span>⏱</span> Updated {formatDate(p.updatedAt)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           )}

//           {/* Invitations View */}
//           {activeTab === 'invitations' && (
//             <div className="space-y-4">
//               {invitations.length === 0 ? (
//                 <p className="text-gray-400 text-center py-10">No pending invitations.</p>
//               ) : (
//                 invitations.map((invite) => (
//                   <div key={invite._id} className="bg-[#161b22] border border-gray-700 p-4 rounded-lg flex justify-between items-center text-white">
//                     <div>
//                       <p className="font-semibold">Project: {invite.project?.title || 'Unknown Project'}</p>
//                       <p className="text-sm text-gray-400">By: {invite.sender?.email}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => handleInvitationResponse(invite._id, 'accepted')} className="bg-[#00a65a] px-3 py-1 rounded text-sm hover:bg-[#008f4d]">Accept</button>
//                       <button onClick={() => handleInvitationResponse(invite._id, 'declined')} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">Decline</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </main>
//       </div>
//       <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectCreated={handleProjectCreated} />
//     </div>
//   );
// };

// export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2, Loader2, FolderOpen } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';
// import api from '../api';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [invitations, setInvitations] = useState([]);
//   const navigate = useNavigate();

//   // FIX 1: Robust user extraction (Checks both storages & handles nested data)
//   const storedData = sessionStorage.getItem('user') || localStorage.getItem('user');
//   let userData = {};
//   if (storedData) {
//     try {
//       const parsed = JSON.parse(storedData);
//       userData = parsed.user ? parsed.user : parsed; // Handle nested user object
//     } catch (e) {
//       console.error("Error parsing user data");
//     }
//   }
//   const displayUserName = userData?.name || 'User';
//   const userInitial = displayUserName !== 'User' ? displayUserName.charAt(0).toUpperCase() : 'U';

//   // FIX 2: Moved fetchProjects outside useEffect so it can be called anytime
//   const fetchProjects = async () => {
//     try {
//       const response = await api.get('/projects');
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(); // Initial load par projects aayenge
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'invitations') {
//       const fetchInvites = async () => {
//         try {
//           const res = await api.get('/invitations/my-invitations');
//           setInvitations(res.data);
//         } catch (err) {
//           console.error("Error fetching invites:", err);
//         }
//       };
//       fetchInvites();
//     }
//   }, [activeTab]);

//   const handleProjectCreated = (newProject) => {
//     setProjects([newProject, ...projects]);
//   };

//   const handleInvitationResponse = async (id, action) => {
//     try {
//       await api.put(`/invitations/respond/${id}`, { action });
      
//       // List se accepted/declined invite ko hatao
//       setInvitations(invitations.filter(invite => invite._id !== id));
      
//       // FIX 2: Agar accept kiya hai, toh turant projects dobara mangwao bina refresh ke
//       if (action === 'accepted') {
//         fetchProjects(); 
//       }
      
//       alert(`Invitation ${action}!`);
//     } catch (err) {
//       alert("Action failed");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             {userInitial}
//           </div>
//           <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenModal={() => setIsModalOpen(true)} />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">
//                 {activeTab === 'recent' && 'Recent'}
//                 {activeTab === 'all' && 'All Repository'}
//                 {activeTab === 'invitations' && 'Invitations'}
//               </h1>
//               <p className="text-sm text-gray-400">
//                 {activeTab === 'recent' && 'Your most recently updated projects'}
//                 {activeTab === 'all' && 'All your projects and templates'}
//                 {activeTab === 'invitations' && 'Manage your project collaborations'}
//               </p>
//             </div>
//             {(activeTab === 'recent' || activeTab === 'all') && (
//               <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2">
//                 <span>⊕</span> New Project
//               </button>
//             )}
//           </div>

//           {/* Projects Grid */}
//           {(activeTab === 'recent' || activeTab === 'all') && (
//             isLoading ? (
//               <div className="flex items-center justify-center py-20 text-gray-400">
//                 <Loader2 size={32} className="animate-spin text-[#00a65a] mr-3" />
//                 <span>Loading your projects...</span>
//               </div>
//             ) : projects.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-24 bg-[#161b22] border border-gray-800 rounded-lg border-dashed">
//                 <FolderOpen size={48} className="text-gray-600 mb-4" />
//                 <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {projects.map((p) => (
//                   <div key={p._id} onClick={() => navigate(`/workspace/${p._id}`)} className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors flex flex-col h-full">
//                     <h3 className="text-white font-bold text-lg mb-1">{p.title}</h3>
//                     <p className="text-xs text-gray-500 mb-4 line-clamp-1">{p.description || 'No description provided'}</p>
//                     <div className="space-y-2 text-sm text-gray-400 mt-auto">
//                       <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: <span className="uppercase text-gray-300">{p.language}</span></p>
//                       <p className="flex items-center gap-2"><span>👤</span> Created by {p.owner === userData?._id ? 'You' : 'Collaborator'}</p>
//                       <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs"><span>⏱</span> Updated {formatDate(p.updatedAt)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           )}

//           {/* Invitations View */}
//           {activeTab === 'invitations' && (
//             <div className="space-y-4">
//               {invitations.length === 0 ? (
//                 <p className="text-gray-400 text-center py-10">No pending invitations.</p>
//               ) : (
//                 invitations.map((invite) => (
//                   <div key={invite._id} className="bg-[#161b22] border border-gray-700 p-4 rounded-lg flex justify-between items-center text-white">
//                     <div>
//                       <p className="font-semibold">Project: {invite.project?.title || 'Unknown Project'}</p>
//                       <p className="text-sm text-gray-400">By: {invite.sender?.email}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => handleInvitationResponse(invite._id, 'accepted')} className="bg-[#00a65a] px-3 py-1 rounded text-sm hover:bg-[#008f4d]">Accept</button>
//                       <button onClick={() => handleInvitationResponse(invite._id, 'declined')} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">Decline</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </main>
//       </div>
//       <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectCreated={handleProjectCreated} />
//     </div>
//   );
// };

// export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2, Loader2, FolderOpen } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';
// import api from '../api';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [invitations, setInvitations] = useState([]);
//   const navigate = useNavigate();

//   // FIX 1: Robust user extraction (Checks both storages & handles nested data)
//   const storedData = sessionStorage.getItem('user') || localStorage.getItem('user');
//   let userData = {};
//   if (storedData) {
//     try {
//       const parsed = JSON.parse(storedData);
//       userData = parsed.user ? parsed.user : parsed; // Handle nested user object
//     } catch (e) {
//       console.error("Error parsing user data");
//     }
//   }
//   const displayUserName = userData?.name || 'User';
//   const userInitial = displayUserName !== 'User' ? displayUserName.charAt(0).toUpperCase() : 'U';

//   // FIX 2: Moved fetchProjects outside useEffect so it can be called anytime
//   const fetchProjects = async () => {
//     try {
//       const response = await api.get('/projects');
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(); // Initial load par projects aayenge
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'invitations') {
//       const fetchInvites = async () => {
//         try {
//           const res = await api.get('/invitations/my-invitations');
//           setInvitations(res.data);
//         } catch (err) {
//           console.error("Error fetching invites:", err);
//         }
//       };
//       fetchInvites();
//     }
//   }, [activeTab]);

//   const handleProjectCreated = (newProject) => {
//     setProjects([newProject, ...projects]);
//   };

//   const handleInvitationResponse = async (id, action) => {
//     try {
//       await api.put(`/invitations/respond/${id}`, { action });
      
//       // List se accepted/declined invite ko hatao
//       setInvitations(invitations.filter(invite => invite._id !== id));
      
//       // FIX 2: Agar accept kiya hai, toh turant projects dobara mangwao bina refresh ke
//       if (action === 'accepted') {
//         fetchProjects(); 
//       }
      
//       alert(`Invitation ${action}!`);
//     } catch (err) {
//       alert("Action failed");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   // NAYA LOGIC: Decide karna ki konsa project dikhana hai (Shared filtering)
//   const getDisplayedProjects = () => {
//     if (activeTab === 'shared') {
//       return projects.filter(p => p.owner !== userData?._id); 
//     }
//     return projects; 
//   };

//   const displayedProjects = getDisplayedProjects();

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             {userInitial}
//           </div>
//           <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenModal={() => setIsModalOpen(true)} />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">
//                 {activeTab === 'recent' && 'Recent'}
//                 {activeTab === 'all' && 'All Repository'}
//                 {activeTab === 'invitations' && 'Invitations'}
//                 {activeTab === 'shared' && 'Shared With Me'}
//                 {activeTab === 'settings' && <SettingsPage />}
//               </h1>
//               <p className="text-sm text-gray-400">
//                 {activeTab === 'recent' && 'Your most recently updated projects'}
//                 {activeTab === 'all' && 'All your projects and templates'}
//                 {activeTab === 'invitations' && 'Manage your project collaborations'}
//                 {activeTab === 'shared' && 'Projects you have been invited to collaborate on'}
//               </p>
//             </div>
//             {(activeTab === 'recent' || activeTab === 'all') && (
//               <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2">
//                 <span>⊕</span> New Project
//               </button>
//             )}
//           </div>

//           {/* Projects Grid with Shared Support */}
//           {(activeTab === 'recent' || activeTab === 'all' || activeTab === 'shared') && (
//             isLoading ? (
//               <div className="flex items-center justify-center py-20 text-gray-400">
//                 <Loader2 size={32} className="animate-spin text-[#00a65a] mr-3" />
//                 <span>Loading your projects...</span>
//               </div>
//             ) : displayedProjects.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-24 bg-[#161b22] border border-gray-800 rounded-lg border-dashed">
//                 <FolderOpen size={48} className="text-gray-600 mb-4" />
//                 <h3 className="text-lg font-medium text-white mb-2">
//                   {activeTab === 'shared' ? 'No shared projects' : 'No projects found'}
//                 </h3>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {displayedProjects.map((p) => (
//                   <div key={p._id} onClick={() => navigate(`/workspace/${p._id}`)} className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors flex flex-col h-full">
//                     <h3 className="text-white font-bold text-lg mb-1">{p.title}</h3>
//                     <p className="text-xs text-gray-500 mb-4 line-clamp-1">{p.description || 'No description provided'}</p>
//                     <div className="space-y-2 text-sm text-gray-400 mt-auto">
//                       <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: <span className="uppercase text-gray-300">{p.language}</span></p>
//                       <p className="flex items-center gap-2">
//                         <span>👤</span> 
//                         {p.owner === userData?._id ? 'Created by You' : 'Shared with You'}
//                       </p>
//                       <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs"><span>⏱</span> Updated {formatDate(p.updatedAt)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           )}

//           {/* Invitations View */}
//           {activeTab === 'invitations' && (
//             <div className="space-y-4">
//               {invitations.length === 0 ? (
//                 <p className="text-gray-400 text-center py-10">No pending invitations.</p>
//               ) : (
//                 invitations.map((invite) => (
//                   <div key={invite._id} className="bg-[#161b22] border border-gray-700 p-4 rounded-lg flex justify-between items-center text-white">
//                     <div>
//                       <p className="font-semibold">Project: {invite.project?.title || 'Unknown Project'}</p>
//                       <p className="text-sm text-gray-400">By: {invite.sender?.email}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => handleInvitationResponse(invite._id, 'accepted')} className="bg-[#00a65a] px-3 py-1 rounded text-sm hover:bg-[#008f4d]">Accept</button>
//                       <button onClick={() => handleInvitationResponse(invite._id, 'declined')} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">Decline</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </main>
//       </div>
//       <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectCreated={handleProjectCreated} />
//     </div>
//   );
// };

// export default DashboardPage;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2, Loader2, FolderOpen } from 'lucide-react';
// import DashboardSidebar from '../components/dashboard/DashboardSidebar';
// import CreateProjectModal from '../components/dashboard/CreateProjectModal';
// import SettingsPage from './SettingsPage'; // 👈 Import kiya
// import api from '../api';

// const DashboardPage = () => {
//   const [activeTab, setActiveTab] = useState('recent');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [invitations, setInvitations] = useState([]);
//   const navigate = useNavigate();

//   const storedData = sessionStorage.getItem('user') || localStorage.getItem('user');
//   let userData = {};
//   if (storedData) {
//     try {
//       const parsed = JSON.parse(storedData);
//       userData = parsed.user ? parsed.user : parsed;
//     } catch (e) {
//       console.error("Error parsing user data");
//     }
//   }
//   const displayUserName = userData?.name || 'User';
//   const userInitial = displayUserName !== 'User' ? displayUserName.charAt(0).toUpperCase() : 'U';

//   const fetchProjects = async () => {
//     try {
//       const response = await api.get('/projects');
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'invitations') {
//       const fetchInvites = async () => {
//         try {
//           const res = await api.get('/invitations/my-invitations');
//           setInvitations(res.data);
//         } catch (err) {
//           console.error("Error fetching invites:", err);
//         }
//       };
//       fetchInvites();
//     }
//   }, [activeTab]);

//   const handleProjectCreated = (newProject) => {
//     setProjects([newProject, ...projects]);
//   };

//   const handleInvitationResponse = async (id, action) => {
//     try {
//       await api.put(`/invitations/respond/${id}`, { action });
//       setInvitations(invitations.filter(invite => invite._id !== id));
//       if (action === 'accepted') {
//         fetchProjects(); 
//       }
//       alert(`Invitation ${action}!`);
//     } catch (err) {
//       alert("Action failed");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   const getDisplayedProjects = () => {
//     if (activeTab === 'shared') {
//       return projects.filter(p => p.owner !== userData?._id); 
//     }
//     return projects; 
//   };

//   const displayedProjects = getDisplayedProjects();

//   return (
//     <div className="min-h-screen flex flex-col bg-[#0d1117]">
//       <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
//             {userInitial}
//           </div>
//           <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 overflow-hidden">
//         <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenModal={() => setIsModalOpen(true)} />
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           {/* Settings Page Rendering */}
//           {activeTab === 'settings' ? (
//             <SettingsPage />
//           ) : (
//             <>
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h1 className="text-2xl font-bold text-white mb-1">
//                     {activeTab === 'recent' && 'Recent'}
//                     {activeTab === 'all' && 'All Repository'}
//                     {activeTab === 'invitations' && 'Invitations'}
//                     {activeTab === 'shared' && 'Shared With Me'}
//                   </h1>
//                   <p className="text-sm text-gray-400">
//                     {activeTab === 'recent' && 'Your most recently updated projects'}
//                     {activeTab === 'all' && 'All your projects and templates'}
//                     {activeTab === 'invitations' && 'Manage your project collaborations'}
//                     {activeTab === 'shared' && 'Projects you have been invited to collaborate on'}
//                   </p>
//                 </div>
//                 {(activeTab === 'recent' || activeTab === 'all') && (
//                   <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2">
//                     <span>⊕</span> New Project
//                   </button>
//                 )}
//               </div>

//               {(activeTab === 'recent' || activeTab === 'all' || activeTab === 'shared') && (
//                 isLoading ? (
//                   <div className="flex items-center justify-center py-20 text-gray-400">
//                     <Loader2 size={32} className="animate-spin text-[#00a65a] mr-3" />
//                     <span>Loading your projects...</span>
//                   </div>
//                 ) : displayedProjects.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center py-24 bg-[#161b22] border border-gray-800 rounded-lg border-dashed">
//                     <FolderOpen size={48} className="text-gray-600 mb-4" />
//                     <h3 className="text-lg font-medium text-white mb-2">
//                       {activeTab === 'shared' ? 'No shared projects' : 'No projects found'}
//                     </h3>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {displayedProjects.map((p) => (
//                       <div key={p._id} onClick={() => navigate(`/workspace/${p._id}`)} className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors flex flex-col h-full">
//                         <h3 className="text-white font-bold text-lg mb-1">{p.title}</h3>
//                         <p className="text-xs text-gray-500 mb-4 line-clamp-1">{p.description || 'No description provided'}</p>
//                         <div className="space-y-2 text-sm text-gray-400 mt-auto">
//                           <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: <span className="uppercase text-gray-300">{p.language}</span></p>
//                           <p className="flex items-center gap-2">
//                             <span>👤</span> 
//                             {p.owner === userData?._id ? 'Created by You' : 'Shared with You'}
//                           </p>
//                           <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs"><span>⏱</span> Updated {formatDate(p.updatedAt)}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )
//               )}

//               {activeTab === 'invitations' && (
//                 <div className="space-y-4">
//                   {invitations.length === 0 ? (
//                     <p className="text-gray-400 text-center py-10">No pending invitations.</p>
//                   ) : (
//                     invitations.map((invite) => (
//                       <div key={invite._id} className="bg-[#161b22] border border-gray-700 p-4 rounded-lg flex justify-between items-center text-white">
//                         <div>
//                           <p className="font-semibold">Project: {invite.project?.title || 'Unknown Project'}</p>
//                           <p className="text-sm text-gray-400">By: {invite.sender?.email}</p>
//                         </div>
//                         <div className="flex gap-2">
//                           <button onClick={() => handleInvitationResponse(invite._id, 'accepted')} className="bg-[#00a65a] px-3 py-1 rounded text-sm hover:bg-[#008f4d]">Accept</button>
//                           <button onClick={() => handleInvitationResponse(invite._id, 'declined')} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">Decline</button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//       <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectCreated={handleProjectCreated} />
//     </div>
//   );
// };

// export default DashboardPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Loader2, FolderOpen } from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import CreateProjectModal from '../components/dashboard/CreateProjectModal';
import SettingsPage from './SettingsPage';
import api from '../api';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  const storedData = sessionStorage.getItem('user') || localStorage.getItem('user');
  let userData = {};
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      userData = parsed.user ? parsed.user : parsed;
    } catch (e) {
      console.error("Error parsing user data");
    }
  }
  const displayUserName = userData?.name || 'User';
  const userInitial = displayUserName !== 'User' ? displayUserName.charAt(0).toUpperCase() : 'U';

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeTab === 'invitations') {
      const fetchInvites = async () => {
        try {
          const res = await api.get('/invitations/my-invitations');
          setInvitations(res.data);
        } catch (err) {
          console.error("Error fetching invites:", err);
        }
      };
      fetchInvites();
    }
  }, [activeTab]);

  const handleProjectCreated = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  const handleInvitationResponse = async (id, action) => {
    try {
      await api.put(`/invitations/respond/${id}`, { action });
      setInvitations(invitations.filter(invite => invite._id !== id));
      if (action === 'accepted') {
        fetchProjects(); 
      }
      alert(`Invitation ${action}!`);
    } catch (err) {
      alert("Action failed");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // ✅ FIXED LOGIC: String conversion se sahi filtering
  // const getDisplayedProjects = () => {
  //   const userIdString = String(userData?._id || '');
  //   if (activeTab === 'shared') {
  //     return projects.filter(p => String(p.owner) !== userIdString);
  //   }
  //   return projects; 
  // };
 const getDisplayedProjects = () => {
    // Current user ki ID ko string mein convert karo
    const myId = String(userData?._id || '');

    if (activeTab === 'shared') {
      // Logic: Woh projects dikhao jahan user collaborator toh hai, 
      // LEKIN project ka owner user khud nahi hai.
      return projects.filter(p => {
        const ownerId = String(p.owner);
        return ownerId !== myId;
      });
    }
    
    // Recent aur All tab mein sab dikhao
    return projects; 
  };
  const displayedProjects = getDisplayedProjects();

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <nav className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#0d1117]">
        {/* <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Code2 className="text-[#00a65a]" size={24} />
          <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
            {userInitial}
          </div>
          <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenModal={() => setIsModalOpen(true)} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'settings' ? (
            <SettingsPage />
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {activeTab === 'recent' && 'Recent'}
                    {activeTab === 'all' && 'All Repository'}
                    {activeTab === 'invitations' && 'Invitations'}
                    {activeTab === 'shared' && 'Shared With Me'}
                  </h1>
                </div>
                {(activeTab === 'recent' || activeTab === 'all') && (
                  <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00a65a] text-white text-sm font-medium rounded-md hover:bg-[#008f4d] transition-colors flex items-center gap-2">
                    <span>⊕</span> New Project
                  </button>
                )}
              </div>

              {(activeTab === 'recent' || activeTab === 'all' || activeTab === 'shared') && (
                isLoading ? (
                  <div className="flex items-center justify-center py-20 text-gray-400">
                    <Loader2 size={32} className="animate-spin text-[#00a65a] mr-3" />
                    <span>Loading your projects...</span>
                  </div>
                ) : displayedProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 bg-[#161b22] border border-gray-800 rounded-lg border-dashed">
                    <FolderOpen size={48} className="text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      {activeTab === 'shared' ? 'No shared projects' : 'No projects found'}
                    </h3>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProjects.map((p) => (
                      <div key={p._id} onClick={() => navigate(`/workspace/${p._id}`)} className="bg-[#161b22] border border-gray-800 rounded-lg p-5 hover:border-gray-600 cursor-pointer transition-colors flex flex-col h-full">
                        <h3 className="text-white font-bold text-lg mb-1">{p.title}</h3>
                        <p className="text-xs text-gray-500 mb-4 line-clamp-1">{p.description || 'No description provided'}</p>
                        <div className="space-y-2 text-sm text-gray-400 mt-auto">
                          <p className="flex items-center gap-2"><span>&lt;/&gt;</span> Language: <span className="uppercase text-gray-300">{p.language}</span></p>
                          <p className="flex items-center gap-2">
                            <span>👤</span> 
                            {String(p.owner) === String(userData?._id) ? 'Created by You' : 'Shared with You'}
                          </p>
                          <p className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 text-xs"><span>⏱</span> Updated {formatDate(p.updatedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'invitations' && (
                <div className="space-y-4">
                  {invitations.length === 0 ? (
                    <p className="text-gray-400 text-center py-10">No pending invitations.</p>
                  ) : (
                    invitations.map((invite) => (
                      <div key={invite._id} className="bg-[#161b22] border border-gray-700 p-4 rounded-lg flex justify-between items-center text-white">
                        <div>
                          <p className="font-semibold">Project: {invite.project?.title || 'Unknown Project'}</p>
                          <p className="text-sm text-gray-400">By: {invite.sender?.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleInvitationResponse(invite._id, 'accepted')} className="bg-[#00a65a] px-3 py-1 rounded text-sm hover:bg-[#008f4d]">Accept</button>
                          <button onClick={() => handleInvitationResponse(invite._id, 'declined')} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">Decline</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProjectCreated={handleProjectCreated} />
    </div>
  );
};

export default DashboardPage;