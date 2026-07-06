
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Code2, Folder, Download, Cloud, CloudRain, UserPlus, Loader2 } from 'lucide-react';
// import Editor from '@monaco-editor/react';
// import { io } from 'socket.io-client';
// import ShareModal from '../components/editor/ShareModal';
// import RightPanel from '../components/execution/RightPanel';
// import api from '../api';

// const WorkspacePage = () => {
//   const { roomId } = useParams(); 
//   const navigate = useNavigate();
  
//   // States
//   const [project, setProject] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [saveStatus, setSaveStatus] = useState('Saved'); // Nayi state auto-save status ke liye
  
//   const socketRef = useRef(null);
//   const editorRef = useRef(null);
//   const isInitialLoad = useRef(true); // Pehli baar load hone par auto-save rokne ke liye
  
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

//   const defaultCppCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;

//   // 1. Fetch Project & Setup Socket
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await api.get(`/projects/${roomId}`);
//         setProject(res.data);
//         setCode(res.data.code || defaultCppCode); 
//       } catch (error) {
//         console.error('Error fetching project:', error);
//         alert('Project not found or access denied!');
//         navigate('/dashboard');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProject();

//     // Socket Setup
//     socketRef.current = io('http://localhost:5000'); 
//     socketRef.current.emit('join-room', { roomId, username: user.name });

//     socketRef.current.on('code-change', (newCode) => {
//       setCode(newCode);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [roomId, navigate, user.name]);

//   // 2. AUTO-SAVE LOGIC (Naya addition)
//   useEffect(() => {
//     // Agar page just abhi load hua hai, toh pehli baar mein hi save mat maro
//     if (isLoading || !project) return;
//     if (isInitialLoad.current) {
//       isInitialLoad.current = false;
//       return;
//     }

//     setSaveStatus('Saving...');
    
//     // User ke type karna band karne ke 1.5 seconds baad save hoga
//     const delayDebounceFn = setTimeout(async () => {
//       try {
//         await api.put(`/projects/${roomId}`, { code: code });
//         setSaveStatus('Saved');
//       } catch (error) {
//         console.error('Auto-save error:', error);
//         setSaveStatus('Error saving');
//       }
//     }, 1500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [code, roomId, project, isLoading]);

//   const handleEditorChange = (value) => {
//     setCode(value);
//     socketRef.current.emit('code-change', { roomId, code: value });
//   };

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
//   };

//   const downloadCode = () => {
//     const element = document.createElement("a");
//     const file = new Blob([code], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = `${project?.title || 'main'}.${project?.language === 'cpp' ? 'cpp' : 'js'}`;
//     document.body.appendChild(element);
//     element.click();
//   };

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#0d1117] text-[#00a65a]">
//         <Loader2 size={40} className="animate-spin" />
//         <span className="ml-3 text-xl font-medium text-white">Loading Workspace...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden">
      
//       {/* Top Navbar */}
//       <nav className="relative z-10 flex items-center justify-between px-6 py-2 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>

//         <div className="flex items-center gap-2 text-gray-300 text-sm">
//           <Folder size={16} className="text-gray-500" />
//           <span>{project?.title || 'Untitled'} / {project?.language || 'C++'}</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => setIsShareModalOpen(true)}
//             className="flex items-center gap-2 px-3 py-1.5 border border-[#00a65a] text-[#00a65a] rounded-md text-sm hover:bg-[#00a65a]/10 transition-colors"
//           >
//             <UserPlus size={16} /> Share
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xs">
//               {userInitial}
//             </div>
//             <span className="text-sm font-medium text-gray-300">{user.name || 'User'}</span>
//           </div>
//         </div>
//       </nav>

//       {/* Main IDE Layout */}
//       <div className="flex-1 flex overflow-hidden">
        
//         {/* Left Side: Editor Area */}
//         <div className="flex-1 flex flex-col min-w-0">
          
//           {/* Editor Toolbar */}
//           <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22]">
//             <button 
//               onClick={downloadCode}
//               className="flex items-center gap-2 px-3 py-1 text-[#00a65a] border border-[#00a65a] rounded text-sm hover:bg-[#00a65a]/10 transition-colors"
//             >
//               <Download size={14} /> Download File
//             </button>
            
//             {/* Dynamic Status Indicator */}
//             <div className={`flex items-center gap-2 text-xs ${saveStatus === 'Saved' ? 'text-green-500' : saveStatus === 'Error saving' ? 'text-red-500' : 'text-yellow-500'}`}>
//               {saveStatus === 'Saving...' ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//               {saveStatus}
//             </div>
//           </div>

//           <div className="flex-1 bg-[#1e1e1e]"> 
//             <Editor
//               height="100%"
//               theme="vs-dark"
//               language={project?.language === 'c' || project?.language === 'cpp' ? 'cpp' : project?.language}
//               value={code}
//               onChange={handleEditorChange}
//               onMount={handleEditorDidMount}
//               options={{
//                 fontSize: 15,
//                 fontFamily: 'Fira Code, Consolas, monospace',
//                 minimap: { enabled: false },
//                 wordWrap: 'on',
//                 formatOnPaste: true,
//                 padding: { top: 16 }
//               }}
//             />
//           </div>
//         </div>

//         <RightPanel 
//           input={input} 
//           setInput={setInput} 
//           output={output}
//           setOutput={setOutput} 
//           code={code}
//           language={project?.language || 'cpp'}
//         />
//       </div>

//       <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} roomId={roomId} />
//     </div>
//   );
// };

// export default WorkspacePage;
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Code2, Folder, Download, Cloud, UserPlus, Loader2 } from 'lucide-react';
// import Editor from '@monaco-editor/react';
// import { io } from 'socket.io-client';
// import ShareModal from '../components/editor/ShareModal';
// import RightPanel from '../components/execution/RightPanel';
// import api from '../api';

// const WorkspacePage = () => {
//   const { roomId } = useParams(); 
//   const navigate = useNavigate();
  
//   // States
//   const [project, setProject] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [saveStatus, setSaveStatus] = useState('Saved'); 
  
//   const socketRef = useRef(null);
//   const editorRef = useRef(null);
//   const isInitialLoad = useRef(true); 
  
//   // FIX 1: Storage update for consistent multi-tab testing
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

//   const defaultCppCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;

//   // 1. Fetch Project & Setup Socket
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await api.get(`/projects/${roomId}`);
//         setProject(res.data);
//         setCode(res.data.code || defaultCppCode); 
//       } catch (error) {
//         console.error('Error fetching project:', error);
//         alert('Project not found or access denied!');
//         navigate('/dashboard');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProject();

//     // FIX 2: Correct Socket Names and Payloads to match Backend
//     socketRef.current = io('http://localhost:5000'); 
    
//     // Emit correct event to join room
//     socketRef.current.emit('join-project', roomId);

//     // Listen to the correct event from backend
//     socketRef.current.on('receive-code', (newCode) => {
//       setCode(newCode);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [roomId, navigate]);

//   // 2. AUTO-SAVE LOGIC
//   useEffect(() => {
//     if (isLoading || !project) return;
//     if (isInitialLoad.current) {
//       isInitialLoad.current = false;
//       return;
//     }

//     setSaveStatus('Saving...');
    
//     const delayDebounceFn = setTimeout(async () => {
//       try {
//         await api.put(`/projects/${roomId}`, { code: code });
//         setSaveStatus('Saved');
//       } catch (error) {
//         console.error('Auto-save error:', error);
//         setSaveStatus('Error saving');
//       }
//     }, 1500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [code, roomId, project, isLoading]);

//   const handleEditorChange = (value) => {
//     setCode(value);
    
//     // FIX 3: Sent exact variables backend is looking for (projectId and newCode)
//     socketRef.current.emit('code-change', { projectId: roomId, newCode: value });
//   };

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
//   };

//   const downloadCode = () => {
//     const element = document.createElement("a");
//     const file = new Blob([code], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = `${project?.title || 'main'}.${project?.language === 'cpp' ? 'cpp' : 'js'}`;
//     document.body.appendChild(element);
//     element.click();
//   };

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#0d1117] text-[#00a65a]">
//         <Loader2 size={40} className="animate-spin" />
//         <span className="ml-3 text-xl font-medium text-white">Loading Workspace...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden">
      
//       {/* Top Navbar */}
//       <nav className="relative z-10 flex items-center justify-between px-6 py-2 border-b border-gray-800 bg-[#0d1117]">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>

//         <div className="flex items-center gap-2 text-gray-300 text-sm">
//           <Folder size={16} className="text-gray-500" />
//           <span>{project?.title || 'Untitled'} / {project?.language || 'C++'}</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => setIsShareModalOpen(true)}
//             className="flex items-center gap-2 px-3 py-1.5 border border-[#00a65a] text-[#00a65a] rounded-md text-sm hover:bg-[#00a65a]/10 transition-colors"
//           >
//             <UserPlus size={16} /> Share
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xs">
//               {userInitial}
//             </div>
//             <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
//           </div>
//         </div>
//       </nav>

//       {/* Main IDE Layout */}
//       <div className="flex-1 flex overflow-hidden">
        
//         {/* Left Side: Editor Area */}
//         <div className="flex-1 flex flex-col min-w-0">
          
//           {/* Editor Toolbar */}
//           <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22]">
//             <button 
//               onClick={downloadCode}
//               className="flex items-center gap-2 px-3 py-1 text-[#00a65a] border border-[#00a65a] rounded text-sm hover:bg-[#00a65a]/10 transition-colors"
//             >
//               <Download size={14} /> Download File
//             </button>
            
//             {/* Dynamic Status Indicator */}
//             <div className={`flex items-center gap-2 text-xs ${saveStatus === 'Saved' ? 'text-green-500' : saveStatus === 'Error saving' ? 'text-red-500' : 'text-yellow-500'}`}>
//               {saveStatus === 'Saving...' ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//               {saveStatus}
//             </div>
//           </div>

//           <div className="flex-1 bg-[#1e1e1e]"> 
//             <Editor
//               height="100%"
//               theme="vs-dark"
//               language={project?.language === 'c' || project?.language === 'cpp' ? 'cpp' : project?.language}
//               value={code}
//               onChange={handleEditorChange}
//               onMount={handleEditorDidMount}
//               options={{
//                 fontSize: 15,
//                 fontFamily: 'Fira Code, Consolas, monospace',
//                 minimap: { enabled: false },
//                 wordWrap: 'on',
//                 formatOnPaste: true,
//                 padding: { top: 16 }
//               }}
//             />
//           </div>
//         </div>

//         <RightPanel 
//           input={input} 
//           setInput={setInput} 
//           output={output}
//           setOutput={setOutput} 
//           code={code}
//           language={project?.language || 'cpp'}
//         />
//       </div>

//       <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} roomId={roomId} />
//     </div>
//   );
// };

// export default WorkspacePage;
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Code2, Folder, Download, Cloud, UserPlus, Loader2, MessageSquare, X, Send } from 'lucide-react';
// import Editor from '@monaco-editor/react';
// import { io } from 'socket.io-client';
// import ShareModal from '../components/editor/ShareModal';
// import RightPanel from '../components/execution/RightPanel';
// import api from '../api';

// const WorkspacePage = () => {
//   const { roomId } = useParams(); 
//   const navigate = useNavigate();
  
//   // Existing States
//   const [project, setProject] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [saveStatus, setSaveStatus] = useState('Saved'); 
  
//   // NEW: Chat States
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const chatEndRef = useRef(null);
  
//   const socketRef = useRef(null);
//   const editorRef = useRef(null);
//   const isInitialLoad = useRef(true); 
  
//   // User Storage Logic
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

//   const defaultCppCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;

//   // 1. Fetch Project & Setup Socket
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await api.get(`/projects/${roomId}`);
//         setProject(res.data);
//         setCode(res.data.code || defaultCppCode); 
//       } catch (error) {
//         console.error('Error fetching project:', error);
//         alert('Project not found or access denied!');
//         navigate('/dashboard');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProject();

//     // Socket Initialization
//     socketRef.current = io('http://localhost:5000'); 
//     socketRef.current.emit('join-project', roomId);

//     // Listen for Code Changes
//     socketRef.current.on('receive-code', (newCode) => {
//       setCode(newCode);
//     });

//     // NEW: Listen for incoming chat messages
//     socketRef.current.on('receive-message', (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [roomId, navigate]);

//   // Scroll to bottom whenever a new chat message arrives
//   useEffect(() => {
//     if (isChatOpen) {
//       chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages, isChatOpen]);

//   // 2. AUTO-SAVE LOGIC
//   useEffect(() => {
//     if (isLoading || !project) return;
//     if (isInitialLoad.current) {
//       isInitialLoad.current = false;
//       return;
//     }

//     setSaveStatus('Saving...');
    
//     const delayDebounceFn = setTimeout(async () => {
//       try {
//         await api.put(`/projects/${roomId}`, { code: code });
//         setSaveStatus('Saved');
//       } catch (error) {
//         console.error('Auto-save error:', error);
//         setSaveStatus('Error saving');
//       }
//     }, 1500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [code, roomId, project, isLoading]);

//   const handleEditorChange = (value) => {
//     setCode(value);
//     socketRef.current.emit('code-change', { projectId: roomId, newCode: value });
//   };

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
//   };

//   const downloadCode = () => {
//     const element = document.createElement("a");
//     const file = new Blob([code], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = `${project?.title || 'main'}.${project?.language === 'cpp' ? 'cpp' : 'js'}`;
//     document.body.appendChild(element);
//     element.click();
//   };

//   // NEW: Handle Sending Chat Message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;

//     const newMessage = {
//       sender: displayUserName,
//       text: chatInput,
//       timestamp: new Date().toISOString()
//     };

//     // Apni screen par message dikhao
//     setMessages((prev) => [...prev, newMessage]);
    
//     // Backend ko message bhejo baaki users ke liye
//     socketRef.current.emit('send-message', { projectId: roomId, ...newMessage });
    
//     setChatInput('');
//   };

//   const formatTime = (dateString) => {
//     return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#0d1117] text-[#00a65a]">
//         <Loader2 size={40} className="animate-spin" />
//         <span className="ml-3 text-xl font-medium text-white">Loading Workspace...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden relative">
      
//       {/* Top Navbar */}
//       <nav className="relative z-10 flex items-center justify-between px-6 py-2 border-b border-gray-800 bg-[#0d1117]">
//         {/* ... (Existing Navbar code untouched) ... */}
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
//           <Code2 className="text-[#00a65a]" size={24} />
//           <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
//         </div>

//         <div className="flex items-center gap-2 text-gray-300 text-sm">
//           <Folder size={16} className="text-gray-500" />
//           <span>{project?.title || 'Untitled'} / {project?.language || 'C++'}</span>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* NEW: Chat Toggle Button */}
//           {/* <button 
//             onClick={() => setIsChatOpen(!isChatOpen)}
//             className="flex items-center gap-2 px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md text-sm hover:bg-gray-800 transition-colors relative"
//           >
//             <MessageSquare size={16} /> 
//             <span>Chat</span>
//             {messages.length > 0 && !isChatOpen && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">!</span>
//             )}
//           </button> */}

//           <button 
//             onClick={() => setIsShareModalOpen(true)}
//             className="flex items-center gap-2 px-3 py-1.5 border border-[#00a65a] text-[#00a65a] rounded-md text-sm hover:bg-[#00a65a]/10 transition-colors"
//           >
//             <UserPlus size={16} /> Share
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xs">
//               {userInitial}
//             </div>
//             <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
//           </div>
//         </div>
//       </nav>

//       {/* Main IDE Layout */}
//       <div className="flex-1 flex overflow-hidden">
        
//         {/* Left Side: Editor Area */}
//         <div className="flex-1 flex flex-col min-w-0">
//           <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22]">
//             <button 
//               onClick={downloadCode}
//               className="flex items-center gap-2 px-3 py-1 text-[#00a65a] border border-[#00a65a] rounded text-sm hover:bg-[#00a65a]/10 transition-colors"
//             >
//               <Download size={14} /> Download File
//             </button>
//             <div className={`flex items-center gap-2 text-xs ${saveStatus === 'Saved' ? 'text-green-500' : saveStatus === 'Error saving' ? 'text-red-500' : 'text-yellow-500'}`}>
//               {saveStatus === 'Saving...' ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
//               {saveStatus}
//             </div>
//           </div>

//           <div className="flex-1 bg-[#1e1e1e]"> 
//             <Editor
//               height="100%"
//               theme="vs-dark"
//               language={project?.language === 'c' || project?.language === 'cpp' ? 'cpp' : project?.language}
//               value={code}
//               onChange={handleEditorChange}
//               onMount={handleEditorDidMount}
//               options={{
//                 fontSize: 15,
//                 fontFamily: 'Fira Code, Consolas, monospace',
//                 minimap: { enabled: false },
//                 wordWrap: 'on',
//                 formatOnPaste: true,
//                 padding: { top: 16 }
//               }}
//             />
//           </div>
//         </div>

//         <RightPanel 
//   input={input} 
//   setInput={setInput} 
//   output={output}
//   setOutput={setOutput} 
//   code={code}
//   language={project?.language || 'cpp'}
//   // 👇 YEH 3 NAYE PROPS ADD KAREIN 👇
//   socket={socketRef.current}
//   roomId={roomId}
//   currentUser={displayUserName}
// />
//       </div>

//       <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} roomId={roomId} />

//       {/* NEW: Floating Chat UI */}
//       {isChatOpen && (
//         <div className="absolute bottom-4 left-4 w-80 h-96 bg-[#161b22] border border-gray-700 rounded-lg shadow-2xl flex flex-col z-50">
//           {/* Chat Header */}
//           <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-[#0d1117] rounded-t-lg">
//             <h3 className="text-white font-medium flex items-center gap-2">
//               <MessageSquare size={16} className="text-[#00a65a]" /> Team Chat
//             </h3>
//             <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
//               <X size={18} />
//             </button>
//           </div>

//           {/* Chat Messages Area */}
//           <div className="flex-1 overflow-y-auto p-3 space-y-3">
//             {messages.length === 0 ? (
//               <p className="text-gray-500 text-xs text-center mt-10">Start the conversation...</p>
//             ) : (
//               messages.map((msg, idx) => (
//                 <div key={idx} className={`flex flex-col ${msg.sender === displayUserName ? 'items-end' : 'items-start'}`}>
//                   <span className="text-[10px] text-gray-500 mb-1">{msg.sender} • {formatTime(msg.timestamp)}</span>
//                   <div className={`px-3 py-2 rounded-lg text-sm max-w-[85%] ${
//                     msg.sender === displayUserName 
//                       ? 'bg-[#00a65a] text-white rounded-tr-none' 
//                       : 'bg-gray-800 text-gray-200 rounded-tl-none'
//                   }`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Chat Input Area */}
//           <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 bg-[#0d1117] rounded-b-lg flex gap-2">
//             <input 
//               type="text" 
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 bg-[#161b22] border border-gray-700 text-white text-sm rounded-md px-3 py-1.5 outline-none focus:border-[#00a65a]"
//             />
//             <button 
//               type="submit"
//               disabled={!chatInput.trim()}
//               className="bg-[#00a65a] text-white p-2 rounded-md hover:bg-[#008f4d] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
//             >
//               <Send size={16} />
//             </button>
//           </form>
//         </div>
//       )}

//     </div>
//   );
// };

// export default WorkspacePage;
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Code2, Folder, Download, Cloud, UserPlus, Loader2 } from 'lucide-react';
// import Editor from '@monaco-editor/react';
// import { io } from 'socket.io-client';
// import ShareModal from '../components/editor/ShareModal';
// import RightPanel from '../components/execution/RightPanel';
// import api from '../api';

// // 👇 YJS IMPORTS 👇
// import * as Y from 'yjs';
// import { WebsocketProvider } from 'y-websocket';
// import { MonacoBinding } from 'y-monaco';

// const WorkspacePage = () => {
//   const { roomId } = useParams(); 
//   const navigate = useNavigate();
  
//   const [project, setProject] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [code, setCode] = useState(''); // Database save ke liye reference
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [saveStatus, setSaveStatus] = useState('Saved'); 
  
//   const socketRef = useRef(null);
//   const editorRef = useRef(null);
//   const yProviderRef = useRef(null); // Provider ka reference
//   const isInitialLoad = useRef(true); 
  
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

//   const defaultCppCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await api.get(`/projects/${roomId}`);
//         setProject(res.data);
//         setCode(res.data.code || defaultCppCode); 
//       } catch (error) {
//         console.error('Error fetching project:', error);
//         navigate('/dashboard');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProject();

//     // Socket.io for Chat
//     socketRef.current = io('http://localhost:5000'); 
//     socketRef.current.emit('join-project', roomId);

//     return () => {
//       socketRef.current.disconnect();
//       // Yjs Provider Cleanup
//       if (yProviderRef.current) {
//         yProviderRef.current.destroy();
//       }
//     };
//   }, [roomId, navigate]);

//   // AUTO-SAVE LOGIC (Database save as it is chalega)
//   useEffect(() => {
//     if (isLoading || !project) return;
//     if (isInitialLoad.current) {
//       isInitialLoad.current = false;
//       return;
//     }

//     setSaveStatus('Saving...');
//     const delayDebounceFn = setTimeout(async () => {
//       try {
//         await api.put(`/projects/${roomId}`, { code: code });
//         setSaveStatus('Saved');
//       } catch (error) {
//         setSaveStatus('Error saving');
//       }
//     }, 1500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [code, roomId, project, isLoading]);


//   // 👇 NAYA LOGIC: YJS + MONACO BINDING 👇
//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;

//     // 1. Create a Yjs Document
//     const ydoc = new Y.Doc();

//     // 2. Connect to the Yjs WebSocket Server (Same as backend)
//     // roomId ko URL params ki tarah pass karte hain taaki isolated room ban jaye
//     const provider = new WebsocketProvider(
//       'ws://localhost:5000', 
//       roomId, 
//       ydoc
//     );
//     yProviderRef.current = provider;

//     // 3. Create a Shared Text type in Yjs
//     const ytext = ydoc.getText('monaco');

//     // 4. BIND Monaco Editor with Yjs Shared Text
//     const binding = new MonacoBinding(
//       ytext, 
//       editorRef.current.getModel(), 
//       new Set([editorRef.current]), 
//       provider.awareness
//     );

//     // 5. Setup Live Cursors (Awareness) - Dusro ko apka naam aur rang dikhega
//     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
//     provider.awareness.setLocalStateField('user', {
//       name: displayUserName,
//       color: randomColor
//     });

//     // 6. DB Code Initialization (Jab server se pehli baar data aaye)
//     provider.on('synced', () => {
//       if (ytext.toString() === '') {
//         ytext.insert(0, project?.code || defaultCppCode);
//       }
//     });

//     // 7. Update React state for Auto-Save whenever code changes
//     ytext.observe(() => {
//       setCode(ytext.toString());
//     });
//   };

//   const downloadCode = () => {
//     const element = document.createElement("a");
//     const file = new Blob([code], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = `${project?.title || 'main'}.${project?.language === 'cpp' ? 'cpp' : 'js'}`;
//     document.body.appendChild(element);
//     element.click();
//   };

//   if (isLoading) return ( <div className="h-screen flex items-center justify-center bg-[#0d1117] text-[#00a65a]"><Loader2 size={40} className="animate-spin" /></div> );

//   return (
//     <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden">
//       {/* Navbar Code (As it is) */}
//       <nav className="relative z-10 flex items-center justify-between px-6 py-2 border-b border-gray-800 bg-[#0d1117]">
//          {/* ... Apka navbar ka code yahan ... */}
//       </nav>

//       <div className="flex-1 flex overflow-hidden">
//         <div className="flex-1 flex flex-col min-w-0">
//           <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22]">
//             <button onClick={downloadCode} className="flex items-center gap-2 px-3 py-1 text-[#00a65a] border border-[#00a65a] rounded text-sm hover:bg-[#00a65a]/10">
//               <Download size={14} /> Download
//             </button>
//             <div className="flex items-center gap-2 text-xs text-green-500">{saveStatus}</div>
//           </div>

//           <div className="flex-1 bg-[#1e1e1e]"> 
//             {/* 👇 DHYAN DEIN: value aur onChange hata diya hai, ab Yjs sambhalega 👇 */}
//             <Editor
//               height="100%"
//               theme="vs-dark"
//               language={project?.language === 'c' || project?.language === 'cpp' ? 'cpp' : project?.language}
//               onMount={handleEditorDidMount}
//               options={{
//                 fontSize: 15,
//                 fontFamily: 'Fira Code, Consolas, monospace',
//                 minimap: { enabled: false },
//                 wordWrap: 'on',
//                 formatOnPaste: true,
//                 padding: { top: 16 }
//               }}
//             />
//           </div>
//         </div>

//         <RightPanel 
//           input={input} setInput={setInput} 
//           output={output} setOutput={setOutput} 
//           code={code} language={project?.language || 'cpp'}
//           socket={socketRef.current} roomId={roomId} currentUser={displayUserName}
//         />
//       </div>
//       <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} roomId={roomId} />
//     </div>
//   );
// };

// export default WorkspacePage;
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, Folder, Download, Cloud, UserPlus, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import ShareModal from '../components/editor/ShareModal';
import RightPanel from '../components/execution/RightPanel';
import api from '../api';

// 👇 YJS IMPORTS 👇
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

const WorkspacePage = () => {
  const { roomId } = useParams(); 
  const navigate = useNavigate();
  
  // States
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState(''); 
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved'); 
  
  // Refs
  const socketRef = useRef(null);
  const editorRef = useRef(null);
  const yProviderRef = useRef(null); 
  const isInitialLoad = useRef(true); 
  
  // Robust User Extraction Logic
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

  const defaultCppCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;

  // 1. Fetch Project & Setup Basic Socket (for Chat)
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${roomId}`);
        setProject(res.data);
        setCode(res.data.code || defaultCppCode); 
      } catch (error) {
        console.error('Error fetching project:', error);
        alert('Project not found or access denied!');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();

    // Socket Setup (RightPanel Chat ke liye zaroori hai)
    socketRef.current = io('http://localhost:5000'); 
    socketRef.current.emit('join-project', roomId);

    return () => {
      socketRef.current.disconnect();
      if (yProviderRef.current) {
        yProviderRef.current.destroy();
      }
    };
  }, [roomId, navigate]);

  // 2. AUTO-SAVE LOGIC
  useEffect(() => {
    if (isLoading || !project) return;
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    setSaveStatus('Saving...');
    
    const delayDebounceFn = setTimeout(async () => {
      try {
        await api.put(`/projects/${roomId}`, { code: code });
        setSaveStatus('Saved');
      } catch (error) {
        console.error('Auto-save error:', error);
        setSaveStatus('Error saving');
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [code, roomId, project, isLoading]);

  // 3. YJS + MONACO BINDING LOGIC
//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;

//     const ydoc = new Y.Doc();

//     // Connect to Yjs WebSocket
//     const provider = new WebsocketProvider(
//       'ws://localhost:5000', 
//       roomId, 
//       ydoc
//     );
//     yProviderRef.current = provider;

//     const ytext = ydoc.getText('monaco');

//     // Bind Editor
//     new MonacoBinding(
//       ytext, 
//       editorRef.current.getModel(), 
//       new Set([editorRef.current]), 
//       provider.awareness
//     );

//     // Live Cursors Setup
//     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
//     provider.awareness.setLocalStateField('user', {
//       name: displayUserName,
//       color: randomColor
//     });

//     provider.on('synced', () => {
//       if (ytext.toString() === '') {
//         ytext.insert(0, project?.code || defaultCppCode);
//       }
//     });

//     // Update state for Auto-Save
//     ytext.observe(() => {
//       setCode(ytext.toString());
//     });
//   };
const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // 1. Language aur Theme set karo (Yahi syntax coloring fix karega)
    monaco.editor.setTheme('vs-dark');
    
    // 2. Yjs Doc setup
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      'ws://localhost:5000', 
      roomId, 
      ydoc
    );
    yProviderRef.current = provider;

    const ytext = ydoc.getText('monaco');

    // 3. Bind Editor
    new MonacoBinding(
      ytext, 
      editorRef.current.getModel(), 
      new Set([editorRef.current]), 
      provider.awareness
    );

    // 4. Awareness setup
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    provider.awareness.setLocalStateField('user', {
      name: displayUserName,
      color: randomColor
    });

    // 5. DB data sync
    provider.on('synced', () => {
      if (ytext.toString() === '') {
        ytext.insert(0, project?.code || defaultCppCode);
      }
    });

    ytext.observe(() => {
      setCode(ytext.toString());
    });
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${project?.title || 'main'}.${project?.language === 'cpp' ? 'cpp' : 'js'}`;
    document.body.appendChild(element);
    element.click();
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d1117] text-[#00a65a]">
        <Loader2 size={40} className="animate-spin" />
        <span className="ml-3 text-xl font-medium text-white">Loading Workspace...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden">
      
      {/* 👇 TOP NAVBAR - POORI TARAH WAPAS AA GAYI 👇 */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-2 border-b border-gray-800 bg-[#0d1117]">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Code2 className="text-[#00a65a]" size={24} />
          <span className="text-lg font-bold text-white tracking-wide">CoDevSpace</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Folder size={16} className="text-gray-500" />
          <span>{project?.title || 'Untitled'} / {project?.language || 'C++'}</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#00a65a] text-[#00a65a] rounded-md text-sm hover:bg-[#00a65a]/10 transition-colors"
          >
            <UserPlus size={16} /> Share
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xs">
              {userInitial}
            </div>
            <span className="text-sm font-medium text-gray-300">{displayUserName}</span>
          </div>
        </div>
      </nav>

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#161b22]">
            <button 
              onClick={downloadCode}
              className="flex items-center gap-2 px-3 py-1 text-[#00a65a] border border-[#00a65a] rounded text-sm hover:bg-[#00a65a]/10 transition-colors"
            >
              <Download size={14} /> Download File
            </button>
            
            <div className={`flex items-center gap-2 text-xs ${saveStatus === 'Saved' ? 'text-green-500' : saveStatus === 'Error saving' ? 'text-red-500' : 'text-yellow-500'}`}>
              {saveStatus === 'Saving...' ? <Loader2 size={14} className="animate-spin" /> : <Cloud size={14} />}
              {saveStatus}
            </div>
          </div>

          <div className="flex-1 bg-[#1e1e1e]"> 
            {/* Editor Setup with Yjs Binding */}
            <Editor
              height="100%"
              theme="vs-dark"
              language={project?.language === 'c' || project?.language === 'cpp' ? 'cpp' : project?.language}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 15,
                fontFamily: 'Fira Code, Consolas, monospace',
                minimap: { enabled: false },
                wordWrap: 'on',
                formatOnPaste: true,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Right Side: Chat and Execution */}
        <RightPanel 
          input={input} 
          setInput={setInput} 
          output={output}
          setOutput={setOutput} 
          code={code}
          language={project?.language || 'cpp'}
          socket={socketRef.current}
          roomId={roomId}
          currentUser={displayUserName}
        />
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} roomId={roomId} />
    </div>
  );
};

export default WorkspacePage;