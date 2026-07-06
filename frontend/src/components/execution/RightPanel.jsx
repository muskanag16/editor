// // import React, { useState } from 'react';
// // import { Play, Send } from 'lucide-react';

// // const RightPanel = ({ input, setInput, output, onRunCode }) => {
// //   const [chatMessage, setChatMessage] = useState('');
  
// //   // Dummy chat messages for UI
// //   const [chatHistory, setChatHistory] = useState([
// //     { id: 1, sender: 'You', text: 'hii', time: '12:08 PM', isMe: true }
// //   ]);

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (!chatMessage.trim()) return;
// //     setChatHistory([...chatHistory, { id: Date.now(), sender: 'You', text: chatMessage, time: 'Now', isMe: true }]);
// //     setChatMessage('');
// //   };

// //   return (
// //     <div className="w-96 bg-[#0d1117] border-l border-gray-800 flex flex-col h-full overflow-hidden p-4 gap-4">
      
// //       {/* Input Box */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-1/4">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Input</div>
// //         <textarea 
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Write input here"
// //           className="flex-1 bg-transparent text-gray-300 text-sm p-3 outline-none resize-none font-mono"
// //         />
// //       </div>

// //       {/* Output Box */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-2/5">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm flex justify-between items-center">
// //           <span>Output</span>
// //           {/* Run Button is usually placed here or in the editor toolbar, moving here for spacing */}
// //           <button 
// //             onClick={onRunCode}
// //             className="flex items-center gap-1 px-3 py-1 bg-[#00a65a] text-white text-xs font-medium rounded hover:bg-[#008f4d] transition-colors"
// //           >
// //             <Play size={12} fill="currentColor" /> Run
// //           </button>
// //         </div>
// //         <div className="flex-1 overflow-auto p-3 bg-transparent text-gray-300 text-sm font-mono whitespace-pre-wrap">
// //           {output || "Press the 'Run' button to execute your code."}
// //         </div>
// //       </div>

// //       {/* Project Chat */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col flex-1">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Project Chat</div>
        
// //         <div className="flex-1 overflow-y-auto p-3 space-y-3">
// //           {chatHistory.map((msg) => (
// //             <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
// //               <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.isMe ? 'bg-[#00a65a] text-white' : 'bg-gray-800 text-gray-200'}`}>
// //                 {msg.text}
// //               </div>
// //               <span className="text-[10px] text-gray-500 mt-1">{msg.sender} • {msg.time}</span>
// //             </div>
// //           ))}
// //         </div>

// //         <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
// //           <input 
// //             type="text" 
// //             value={chatMessage}
// //             onChange={(e) => setChatMessage(e.target.value)}
// //             placeholder="Type a message..."
// //             className="flex-1 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#00a65a]"
// //           />
// //           <button type="submit" className="bg-[#00a65a] text-white p-2 rounded-md hover:bg-[#008f4d]">
// //             <Send size={16} />
// //           </button>
// //         </form>
// //       </div>

// //     </div>
// //   );
// // };

// // export default RightPanel;
// // import React, { useState } from 'react';
// // import { Play, Send, Loader2 } from 'lucide-react';
// // import axios from 'axios';

// // const RightPanel = ({ input, setInput, output, setOutput, code, language = 'cpp' }) => {
// //   const [chatMessage, setChatMessage] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   // Dummy chat messages for UI
// //   const [chatHistory, setChatHistory] = useState([
// //     { id: 1, sender: 'You', text: 'hii', time: '12:08 PM', isMe: true }
// //   ]);

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (!chatMessage.trim()) return;
// //     setChatHistory([...chatHistory, { id: Date.now(), sender: 'You', text: chatMessage, time: 'Now', isMe: true }]);
// //     setChatMessage('');
// //   };

// //   // ASLI EXECUTION LOGIC (Hits your Node.js Backend)
// //   const handleRunCode = async () => {
// //     if (!code) return;
    
// //     setIsLoading(true);
// //     setOutput('Running code on server...');

// //     try {
// //       // Backend par POST request bhej rahe hain
// //       // Make sure aapka Node backend http://localhost:5000 par chal raha ho
// //       const response = await axios.post('http://localhost:5000/api/execute', {
// //         code: code,
// //         language: language,
// //         input: input
// //       });

// //       // Backend (Piston/Judge0) se jo response aaya use UI mein set karna
// //       if (response.data.error) {
// //         setOutput(`Error:\n${response.data.error}`);
// //       } else {
// //         setOutput(`${response.data.output}\n\n[Execution Time: ${response.data.time}ms]`);
// //       }
// //     } catch (error) {
// //       console.error('Execution Error:', error);
// //       setOutput('Failed to execute code. Please check if your backend server is running on port 5000.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="w-96 bg-[#0d1117] border-l border-gray-800 flex flex-col h-full overflow-hidden p-4 gap-4">
      
// //       {/* Input Box */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-1/4">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Input</div>
// //         <textarea 
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Write input here"
// //           className="flex-1 bg-transparent text-gray-300 text-sm p-3 outline-none resize-none font-mono"
// //         />
// //       </div>

// //       {/* Output Box */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-2/5">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm flex justify-between items-center">
// //           <span>Output</span>
          
// //           <button 
// //             onClick={handleRunCode}
// //             disabled={isLoading}
// //             className={`flex items-center gap-1 px-3 py-1 text-white text-xs font-medium rounded transition-colors ${
// //               isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d]'
// //             }`}
// //           >
// //             {isLoading ? (
// //               <Loader2 size={12} className="animate-spin" />
// //             ) : (
// //               <Play size={12} fill="currentColor" />
// //             )}
// //             {isLoading ? 'Running...' : 'Run'}
// //           </button>
// //         </div>
// //         <div className="flex-1 overflow-auto p-3 bg-transparent text-gray-300 text-sm font-mono whitespace-pre-wrap">
// //           {output || "Press the 'Run' button to execute your code."}
// //         </div>
// //       </div>

// //       {/* Project Chat */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col flex-1">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Project Chat</div>
        
// //         <div className="flex-1 overflow-y-auto p-3 space-y-3">
// //           {chatHistory.map((msg) => (
// //             <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
// //               <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.isMe ? 'bg-[#00a65a] text-white' : 'bg-gray-800 text-gray-200'}`}>
// //                 {msg.text}
// //               </div>
// //               <span className="text-[10px] text-gray-500 mt-1">{msg.sender} • {msg.time}</span>
// //             </div>
// //           ))}
// //         </div>

// //         <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
// //           <input 
// //             type="text" 
// //             value={chatMessage}
// //             onChange={(e) => setChatMessage(e.target.value)}
// //             placeholder="Type a message..."
// //             className="flex-1 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#00a65a]"
// //           />
// //           <button type="submit" className="bg-[#00a65a] text-white p-2 rounded-md hover:bg-[#008f4d]">
// //             <Send size={16} />
// //           </button>
// //         </form>
// //       </div>

// //     </div>
// //   );
// // };

// // export default RightPanel;
// // import React, { useState } from 'react';
// // import { Play, Send, Loader2 } from 'lucide-react';
// // import axios from 'axios';

// // const RightPanel = ({ input, setInput, output, setOutput, code, language = 'cpp' }) => {
// //   const [chatMessage, setChatMessage] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   const [chatHistory, setChatHistory] = useState([
// //     { id: 1, sender: 'System', text: 'Welcome to the project chat!', time: 'Now', isMe: false }
// //   ]);

// //   // Language mapping for Piston API
// //   const languageMap = {
// //     'c': { lang: 'c', version: '10.2.0' },
// //     'cpp': { lang: 'c++', version: '10.2.0' },
// //     'python': { lang: 'python', version: '3.10.0' },
// //     'javascript': { lang: 'javascript', version: '18.15.0' },
// //     'java': { lang: 'java', version: '15.0.2' },
// //     'go': { lang: 'go', version: '1.16.2' },
// //     'rust': { lang: 'rust', version: '1.68.2' },
// //     'ruby': { lang: 'ruby', version: '3.0.1' },
// //     'kotlin': { lang: 'kotlin', version: '1.8.20' }
// //   };

// //   // ASLI EXECUTION LOGIC (Using Piston API)
// //   const handleRunCode = async () => {
// //     if (!code) return;
    
// //     setIsLoading(true);
// //     setOutput('Compiling and running code...\n');

// //     try {
// //       // Find language config, default to cpp if not found
// //       const config = languageMap[language] || languageMap['cpp'];

// //       // Piston API Call
// //       const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
// //         language: config.lang,
// //         version: config.version,
// //         files: [{ content: code }],
// //         stdin: input // User ka input bhi bhej rahe hain
// //       });

// //       const { compile, run } = response.data;

// //       // Agar C++/Java mein Compile Error aaya
// //       if (compile && compile.code !== 0) {
// //         setOutput(`🚨 Compilation Error:\n${compile.stderr || compile.output}`);
// //       } 
// //       // Agar Run time (Execution) error aaya
// //       else if (run.code !== 0) {
// //         setOutput(`⚠️ Runtime Error:\n${run.stderr || run.output}`);
// //       } 
// //       // Agar Code successfully chal gaya
// //       else {
// //         setOutput(`${run.stdout}\n\n✅ [Program finished successfully]`);
// //       }

// //     } catch (error) {
// //       console.error('Execution Error:', error);
// //       setOutput('❌ Failed to connect to execution server. Please check your internet.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (!chatMessage.trim()) return;
// //     setChatHistory([...chatHistory, { id: Date.now(), sender: 'You', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isMe: true }]);
// //     setChatMessage('');
// //   };

// //   return (
// //     <div className="w-96 bg-[#0d1117] border-l border-gray-800 flex flex-col h-full overflow-hidden p-4 gap-4">
      
// //       {/* Input Box */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-1/4">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Input</div>
// //         <textarea 
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Enter program input here..."
// //           className="flex-1 bg-transparent text-gray-300 text-sm p-3 outline-none resize-none font-mono"
// //         />
// //       </div>

// //       {/* Output Box */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-2/5 shadow-lg relative">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm flex justify-between items-center bg-[#1c2128] rounded-t-lg">
// //           <span className="flex items-center gap-2">Output</span>
          
// //           <button 
// //             onClick={handleRunCode}
// //             disabled={isLoading}
// //             className={`flex items-center gap-1.5 px-4 py-1.5 text-white text-xs font-bold rounded shadow-sm transition-all ${
// //               isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d] active:scale-95'
// //             }`}
// //           >
// //             {isLoading ? (
// //               <Loader2 size={14} className="animate-spin" />
// //             ) : (
// //               <Play size={14} fill="currentColor" />
// //             )}
// //             {isLoading ? 'Running...' : 'Run Code'}
// //           </button>
// //         </div>
// //         <div className="flex-1 overflow-auto p-3 bg-[#0d1117] text-gray-300 text-sm font-mono whitespace-pre-wrap">
// //           {output || <span className="text-gray-600 italic">Press 'Run Code' to see output here.</span>}
// //         </div>
// //       </div>

// //       {/* Project Chat */}
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col flex-1">
// //         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Project Chat</div>
        
// //         <div className="flex-1 overflow-y-auto p-3 space-y-3">
// //           {chatHistory.map((msg) => (
// //             <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
// //               <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.isMe ? 'bg-[#00a65a] text-white' : 'bg-gray-800 text-gray-200'}`}>
// //                 {msg.text}
// //               </div>
// //               <span className="text-[10px] text-gray-500 mt-1">{msg.sender} • {msg.time}</span>
// //             </div>
// //           ))}
// //         </div>

// //         <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
// //           <input 
// //             type="text" 
// //             value={chatMessage}
// //             onChange={(e) => setChatMessage(e.target.value)}
// //             placeholder="Type a message..."
// //             className="flex-1 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#00a65a]"
// //           />
// //           <button type="submit" className="bg-[#00a65a] text-white p-2 rounded-md hover:bg-[#008f4d]">
// //             <Send size={16} />
// //           </button>
// //         </form>
// //       </div>

// //     </div>
// //   );
// // };

// // export default RightPanel;
// import React, { useState } from 'react';
// import { Play, Send, Loader2 } from 'lucide-react';
// import axios from 'axios';

// const RightPanel = ({ input, setInput, output, setOutput, code, language = 'cpp' }) => {
//   const [chatMessage, setChatMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const [chatHistory, setChatHistory] = useState([
//     { id: 1, sender: 'System', text: 'Welcome to the project chat!', time: 'Now', isMe: false }
//   ]);

//   // 1. WANDBOX LANGUAGE MAP: Piston ki jagah ab hum Wandbox ke compilers use karenge
//   const languageMap = {
//     'c': 'gcc-head',
//     'cpp': 'gcc-head',
//     'python': 'cpython-head',
//     'javascript': 'nodejs-head',
//     'java': 'openjdk-head',
//     'go': 'go-head',
//     'rust': 'rust-head',
//     'ruby': 'ruby-head',
//     'kotlin': 'kotlin-head'
//   };

//   // 2. ASLI EXECUTION LOGIC (Using Free Wandbox API)
//   const handleRunCode = async () => {
//     if (!code) return;
    
//     setIsLoading(true);
//     setOutput('Compiling and running code on cloud (Wandbox)...\n');

//     try {
//       const compilerName = languageMap[language] || 'gcc-head';

//       // Wandbox API Call
//       const response = await axios.post('https://wandbox.org/api/compile.json', {
//         compiler: compilerName,
//         code: code,
//         stdin: input || ''
//       });

//       const { status, program_message, compiler_message } = response.data;

//       // Agar Compile ya Runtime Error aaya (status non-zero hota hai error aane par)
//       if (status !== "0") {
//         setOutput(`⚠️ Error:\n${compiler_message ? compiler_message + '\n' : ''}${program_message || ''}`);
//       } 
//       // Agar Code successfully chal gaya
//       else {
//         setOutput(`${program_message || ''}\n\n✅ [Program finished successfully]`);
//       }

//     } catch (error) {
//       console.error('Execution Error:', error);
//       setOutput('❌ Failed to connect to execution server. Please check your internet connection or disable adblockers.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!chatMessage.trim()) return;
//     setChatHistory([...chatHistory, { id: Date.now(), sender: 'You', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isMe: true }]);
//     setChatMessage('');
//   };

//   return (
//     <div className="w-96 bg-[#0d1117] border-l border-gray-800 flex flex-col h-full overflow-hidden p-4 gap-4">
      
//       {/* Input Box */}
//       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-1/4">
//         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Input</div>
//         <textarea 
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter program input here..."
//           className="flex-1 bg-transparent text-gray-300 text-sm p-3 outline-none resize-none font-mono"
//         />
//       </div>

//       {/* Output Box */}
//       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-2/5 shadow-lg relative">
//         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm flex justify-between items-center bg-[#1c2128] rounded-t-lg">
//           <span className="flex items-center gap-2">Output</span>
          
//           <button 
//             onClick={handleRunCode}
//             disabled={isLoading}
//             className={`flex items-center gap-1.5 px-4 py-1.5 text-white text-xs font-bold rounded shadow-sm transition-all ${
//               isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d] active:scale-95'
//             }`}
//           >
//             {isLoading ? (
//               <Loader2 size={14} className="animate-spin" />
//             ) : (
//               <Play size={14} fill="currentColor" />
//             )}
//             {isLoading ? 'Running...' : 'Run Code'}
//           </button>
//         </div>
//         <div className="flex-1 overflow-auto p-3 bg-[#0d1117] text-gray-300 text-sm font-mono whitespace-pre-wrap">
//           {output || <span className="text-gray-600 italic">Press 'Run Code' to see output here.</span>}
//         </div>
//       </div>

//       {/* Project Chat */}
//       <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col flex-1">
//         <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Project Chat</div>
        
//         <div className="flex-1 overflow-y-auto p-3 space-y-3">
//           {chatHistory.map((msg) => (
//             <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
//               <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.isMe ? 'bg-[#00a65a] text-white' : 'bg-gray-800 text-gray-200'}`}>
//                 {msg.text}
//               </div>
//               <span className="text-[10px] text-gray-500 mt-1">{msg.sender} • {msg.time}</span>
//             </div>
//           ))}
//         </div>

//         <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
//           <input 
//             type="text" 
//             value={chatMessage}
//             onChange={(e) => setChatMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#00a65a]"
//           />
//           <button type="submit" className="bg-[#00a65a] text-white p-2 rounded-md hover:bg-[#008f4d]">
//             <Send size={16} />
//           </button>
//         </form>
//       </div>

//     </div>
//   );
// };

// export default RightPanel;

import React, { useState, useEffect, useRef } from 'react';
import { Play, Send, Loader2, Smile } from 'lucide-react';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

const RightPanel = ({ input, setInput, output, setOutput, code, language = 'cpp', socket, roomId, currentUser }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const chatEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the project chat!', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isMe: false }
  ]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      setChatHistory((prev) => [...prev, { 
        id: Date.now(), 
        sender: message.sender, 
        text: message.text, 
        time: message.time || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
        isMe: false 
      }]);
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const languageMap = {
    'c': 'gcc-head',
    'cpp': 'gcc-head',
    'python': 'cpython-head',
    'javascript': 'nodejs-head',
    'java': 'openjdk-head',
    'go': 'go-head',
    'rust': 'rust-head',
    'ruby': 'ruby-head',
    'kotlin': 'kotlin-head'
  };

  const handleRunCode = async () => {
    if (!code) return;
    setIsLoading(true);
    setOutput('Compiling and running code on cloud (Wandbox)...\n');

    try {
      const compilerName = languageMap[language] || 'gcc-head';
      const response = await axios.post('https://wandbox.org/api/compile.json', {
        compiler: compilerName,
        code: code,
        stdin: input || ''
      });

      const { status, program_message, compiler_message } = response.data;

      if (status !== "0") {
        setOutput(`⚠️ Error:\n${compiler_message ? compiler_message + '\n' : ''}${program_message || ''}`);
      } else {
        setOutput(`${program_message || ''}\n\n✅ [Program finished successfully]`);
      }
    } catch (error) {
      console.error('Execution Error:', error);
      setOutput('❌ Failed to connect to execution server. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const messageData = {
      sender: currentUser || 'User',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setChatHistory([...chatHistory, { ...messageData, id: Date.now(), isMe: true }]);
    
    if (socket) {
      socket.emit('send-message', { projectId: roomId, ...messageData });
    }

    setChatMessage('');
    setShowEmojiPicker(false); 
  };

  const onEmojiClick = (emojiObject) => {
    setChatMessage(prev => prev + emojiObject.emoji);
  };

  return (
    <div className="w-96 bg-[#0d1117] border-l border-gray-800 flex flex-col h-full overflow-hidden p-4 gap-4">
      
      {/* Input Box - shrink-0 fix applied */}
      <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-[25%] shrink-0">
        <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Input</div>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter program input here..."
          className="flex-1 bg-transparent text-gray-300 text-sm p-3 outline-none resize-none font-mono"
        />
      </div>

      {/* Output Box - shrink-0 fix applied */}
      <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col h-[35%] shrink-0 shadow-lg relative">
        <div className="p-3 border-b border-gray-800 font-medium text-white text-sm flex justify-between items-center bg-[#1c2128] rounded-t-lg">
          <span className="flex items-center gap-2">Output</span>
          <button 
            onClick={handleRunCode}
            disabled={isLoading}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-white text-xs font-bold rounded shadow-sm transition-all ${
              isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d] active:scale-95'
            }`}
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
        </div>
        <div className="flex-1 overflow-auto p-3 bg-[#0d1117] text-gray-300 text-sm font-mono whitespace-pre-wrap">
          {output || <span className="text-gray-600 italic">Press 'Run Code' to see output here.</span>}
        </div>
      </div>

      {/* Project Chat - min-h-0 fix applied */}
      <div className="bg-[#161b22] border border-gray-800 rounded-lg flex flex-col flex-1 relative min-h-0">
        <div className="p-3 border-b border-gray-800 font-medium text-white text-sm">Project Chat</div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${msg.isMe ? 'bg-[#00a65a] text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none'}`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-500 mt-1">{msg.sender} • {msg.time}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-50">
            <EmojiPicker 
              onEmojiClick={onEmojiClick} 
              theme="dark" 
              width={350} 
              height={300}
            />
          </div>
        )}

        {/* Chat Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2 items-center">
          <button 
            type="button" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-[#00a65a] transition-colors"
          >
            <Smile size={20} />
          </button>
          
          <input 
            type="text" 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onFocus={() => setShowEmojiPicker(false)} 
            placeholder="Type a message..."
            className="flex-1 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#00a65a]"
          />
          
          <button type="submit" disabled={!chatMessage.trim()} className="bg-[#00a65a] text-white p-1.5 rounded-md hover:bg-[#008f4d] disabled:opacity-50">
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default RightPanel;