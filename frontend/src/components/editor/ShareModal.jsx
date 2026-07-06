// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const ShareModal = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [permission, setPermission] = useState('view'); // 'view' or 'edit'

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-[#161b22] border border-gray-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden relative">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 pb-2">
//           <h2 className="text-xl font-bold text-white">Share Project</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
//             <X size={20} />
//           </button>
//         </div>
//         <div className="px-5 pb-4">
//           <p className="text-sm text-gray-400">Invite people or share a link to collaborate.</p>
//         </div>

//         {/* Body */}
//         <div className="p-5 border-t border-gray-800 space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Invite by email</label>
//             <input 
//               type="email" 
//               placeholder="user@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Permission</label>
//             <div className="flex items-center gap-6">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input 
//                   type="radio" 
//                   name="permission" 
//                   value="view"
//                   checked={permission === 'view'}
//                   onChange={(e) => setPermission(e.target.value)}
//                   className="accent-[#00a65a] w-4 h-4"
//                 />
//                 <span className="text-sm text-gray-300">Can view</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input 
//                   type="radio" 
//                   name="permission" 
//                   value="edit"
//                   checked={permission === 'edit'}
//                   onChange={(e) => setPermission(e.target.value)}
//                   className="accent-[#00a65a] w-4 h-4"
//                 />
//                 <span className="text-sm text-gray-300">Can edit</span>
//               </label>
//             </div>
//           </div>

//           <button className="w-full bg-[#00a65a] text-white font-medium py-2 rounded-md hover:bg-[#008f4d] transition-colors mt-2">
//             Send Invite
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShareModal;
// import React from 'react';
// import { X, Copy } from 'lucide-react';

// const ShareModal = ({ isOpen, onClose, roomId }) => {
//   if (!isOpen) return null;

//   // Current page ka URL nikalega (jisko share karna hai)
//   const shareUrl = window.location.href; 

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(shareUrl);
//     alert("Link copied to clipboard! Share it with your friends.");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-[#161b22] border border-gray-800 rounded-lg w-full max-w-md p-6 shadow-2xl relative">
//         <button 
//           onClick={onClose} 
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//         >
//           <X size={20} />
//         </button>
        
//         <h2 className="text-xl font-bold text-white mb-2">Share Workspace</h2>
//         <p className="text-sm text-gray-400 mb-6">
//           Share this link with your team to code together in real-time.
//         </p>
        
//         <div className="flex gap-2">
//           <input 
//             type="text" 
//             readOnly 
//             value={shareUrl} 
//             className="flex-1 bg-[#0d1117] border border-gray-700 text-gray-300 text-sm rounded-md px-3 py-2 outline-none" 
//           />
//           <button 
//             onClick={copyToClipboard} 
//             className="bg-[#00a65a] text-white px-4 py-2 rounded-md hover:bg-[#008f4d] flex items-center gap-2 transition-colors font-medium text-sm"
//           >
//             <Copy size={16} /> Copy
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShareModal;
// src/components/editor/ShareModal.jsx
import React, { useState } from 'react';
import { X, Copy, Send, Loader2 } from 'lucide-react';
import api from '../../api';

const ShareModal = ({ isOpen, onClose, roomId }) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  if (!isOpen) return null;

  const shareUrl = window.location.href; 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied! You can also send an official invite below.");
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);
    try {
      await api.post('/invitations/send', {
        projectId: roomId,
        receiverEmail: email
      });
      alert(`Invitation sent to ${email}!`);
      setEmail('');
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send invitation');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] border border-gray-800 rounded-lg w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
        
        <h2 className="text-xl font-bold text-white mb-2">Share Workspace</h2>
        <p className="text-sm text-gray-400 mb-6">Invite your teammates to code live with you.</p>
        
        {/* Email Invite Form */}
        <form onSubmit={handleSendInvite} className="space-y-4 mb-6 pb-6 border-b border-gray-800">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Invite by Email</label>
            <div className="flex gap-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teammate@gmail.com" 
                className="flex-1 bg-[#0d1117] border border-gray-700 text-gray-300 text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a]" 
              />
              <button 
                type="submit" 
                disabled={isSending}
                className="bg-[#00a65a] text-white px-4 py-2 rounded-md hover:bg-[#008f4d] flex items-center gap-2 transition-colors font-medium text-sm disabled:bg-gray-700"
              >
                {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Send
              </button>
            </div>
          </div>
        </form>

        {/* Workspace Link Copy */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Workspace Link</label>
          <div className="flex gap-2">
            <input type="text" readOnly value={shareUrl} className="flex-1 bg-[#0d1117] border border-gray-700 text-gray-500 text-sm rounded-md px-3 py-1.5 outline-none" />
            <button type="button" onClick={copyToClipboard} className="border border-gray-700 text-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-800 text-xs flex items-center gap-1"><Copy size={14} /> Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;