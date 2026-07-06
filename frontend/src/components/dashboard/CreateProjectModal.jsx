// // import React, { useState } from 'react';
// // import { X } from 'lucide-react';

// // const CreateProjectModal = ({ isOpen, onClose }) => {
// //   const [selectedTemplate, setSelectedTemplate] = useState('cpp');

// //   if (!isOpen) return null;

// //   const templates = [
// //     { id: 'c', name: 'C', icon: 'C', color: 'bg-blue-500' },
// //     { id: 'cpp', name: 'C++', icon: 'C++', color: 'bg-blue-600' },
// //     { id: 'go', name: 'Go', icon: 'Go', color: 'bg-cyan-500' },
// //     { id: 'java', name: 'Java', icon: '☕', color: 'bg-red-500' },
// //     { id: 'javascript', name: 'JavaScript', icon: 'JS', color: 'bg-yellow-500 text-black' },
// //     { id: 'kotlin', name: 'Kotlin', icon: 'K', color: 'bg-purple-500' },
// //     { id: 'python', name: 'Python', icon: '🐍', color: 'bg-blue-400' },
// //     { id: 'ruby', name: 'Ruby', icon: '♦', color: 'bg-red-600' },
// //     { id: 'rust', name: 'Rust', icon: '⚙', color: 'bg-orange-600' },
// //   ];

// //   return (
// //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// //       <div className="bg-[#161b22] border border-gray-800 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
        
// //         {/* Header */}
// //         <div className="flex items-center justify-between p-4 border-b border-gray-800">
// //           <h2 className="text-xl font-bold text-white">Create New Project</h2>
// //           <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* Form Body */}
// //         <div className="p-5 space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-1">Enter Project Name</label>
// //             <input 
// //               type="text" 
// //               placeholder="Project Name"
// //               className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-1">Enter Project Description</label>
// //             <input 
// //               type="text" 
// //               placeholder="Project Description"
// //               className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-300 mb-3">Select Template</label>
// //             <div className="grid grid-cols-3 gap-4">
// //               {templates.map((template) => (
// //                 <div 
// //                   key={template.id}
// //                   onClick={() => setSelectedTemplate(template.id)}
// //                   className="flex flex-col items-center gap-2 cursor-pointer"
// //                 >
// //                   <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold ${template.color} ${selectedTemplate === template.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#161b22]' : 'opacity-80 hover:opacity-100'}`}>
// //                     {template.icon}
// //                   </div>
// //                   <span className={`text-xs ${selectedTemplate === template.id ? 'text-white font-medium' : 'text-gray-400'}`}>
// //                     {template.name}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="p-4 border-t border-gray-800">
// //           <button className="w-full bg-[#00a65a] text-white font-medium py-2 rounded-md hover:bg-[#008f4d] transition-colors flex items-center justify-center gap-2">
// //             <span>⊕</span> Create
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateProjectModal;
// import React, { useState } from 'react';
// import { X, Loader2 } from 'lucide-react';
// import api from '../../api';

// const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedTemplate, setSelectedTemplate] = useState('cpp');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!isOpen) return null;

//   const templates = [
//     { id: 'c', name: 'C', icon: 'C', color: 'bg-blue-500' },
//     { id: 'cpp', name: 'C++', icon: 'C++', color: 'bg-blue-600' },
//     { id: 'go', name: 'Go', icon: 'Go', color: 'bg-cyan-500' },
//     { id: 'java', name: 'Java', icon: '☕', color: 'bg-red-500' },
//     { id: 'javascript', name: 'JavaScript', icon: 'JS', color: 'bg-yellow-500 text-black' },
//     { id: 'kotlin', name: 'Kotlin', icon: 'K', color: 'bg-purple-500' },
//     { id: 'python', name: 'Python', icon: '🐍', color: 'bg-blue-400' },
//     { id: 'ruby', name: 'Ruby', icon: '♦', color: 'bg-red-600' },
//     { id: 'rust', name: 'Rust', icon: '⚙', color: 'bg-orange-600' },
//   ];

//   const handleCreateProject = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) {
//       alert('Please enter a project name');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       // Backend api par data bhej rahe hain
//       const response = await api.post('/projects', {
//         title,
//         description,
//         language: selectedTemplate
//       });

//       // Success hone par parent component (Dashboard) ko naya project bhej denge
//       onProjectCreated(response.data);
      
//       // Form reset aur close karein
//       setTitle('');
//       setDescription('');
//       onClose();
//     } catch (error) {
//       console.error('Error creating project:', error);
//       alert(error.response?.data?.message || 'Failed to create project');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-[#161b22] border border-gray-800 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-800">
//           <h2 className="text-xl font-bold text-white">Create New Project</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form Body */}
//         <form onSubmit={handleCreateProject}>
//           <div className="p-5 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Enter Project Name</label>
//               <input 
//                 type="text" 
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Project Name"
//                 className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Enter Project Description</label>
//               <input 
//                 type="text" 
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Project Description"
//                 className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-3">Select Template</label>
//               <div className="grid grid-cols-3 gap-4">
//                 {templates.map((template) => (
//                   <div 
//                     key={template.id}
//                     onClick={() => setSelectedTemplate(template.id)}
//                     className="flex flex-col items-center gap-2 cursor-pointer"
//                   >
//                     <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold ${template.color} ${selectedTemplate === template.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#161b22]' : 'opacity-80 hover:opacity-100'}`}>
//                       {template.icon}
//                     </div>
//                     <span className={`text-xs ${selectedTemplate === template.id ? 'text-white font-medium' : 'text-gray-400'}`}>
//                       {template.name}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="p-4 border-t border-gray-800">
//             <button 
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d]'}`}
//             >
//               {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <span>⊕</span>}
//               {isSubmitting ? 'Creating...' : 'Create'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProjectModal;
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Yeh import karna zaroori hai
import api from '../../api';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const navigate = useNavigate(); // 2. Navigate initialize kiya
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('cpp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

//   const templates = [
//     { id: 'c', name: 'C', icon: 'C', color: 'bg-blue-500' },
//     { id: 'cpp', name: 'C++', icon: 'C++', color: 'bg-blue-600' },
//     { id: 'go', name: 'Go', icon: 'Go', color: 'bg-cyan-500' },
//     { id: 'java', name: 'Java', icon: '☕', color: 'bg-red-500' },
//     { id: 'javascript', name: 'JavaScript', icon: 'JS', color: 'bg-yellow-500 text-black' },
//     { id: 'kotlin', name: 'Kotlin', icon: 'K', color: 'bg-purple-500' },
//     { id: 'python', name: 'Python', icon: '🐍', color: 'bg-blue-400' },
//     { id: 'ruby', name: 'Ruby', icon: '♦', color: 'bg-red-600' },
//     { id: 'rust', name: 'Rust', icon: '⚙', color: 'bg-orange-600' },
//   ];
const templates = [
  { 
    id: 'c', 
    name: 'C', 
    icon: 'C', 
    color: 'bg-[#555555] text-white', 
    description: 'Standard C basic boilerplate',
    defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
  },
  { 
    id: 'cpp', 
    name: 'C++', 
    icon: 'C++', 
    color: 'bg-[#00599C] text-white', 
    description: 'C++ starter with iostream',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}'
  },
  { 
    id: 'python', 
    name: 'Python', 
    icon: '🐍', 
    color: 'bg-[#3776AB] text-white', 
    description: 'Simple Python 3 script',
    defaultCode: 'def main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()'
  },
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    icon: 'JS', 
    color: 'bg-[#F7DF1E] text-black', 
    description: 'Node.js empty template',
    defaultCode: 'console.log("Hello, World!");\n\n// Write your logic here\n'
  },
  { 
    id: 'java', 
    name: 'Java', 
    icon: '☕', 
    color: 'bg-[#b07219] text-white', 
    description: 'Java Main class boilerplate',
    defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
  },
  { 
    id: 'go', 
    name: 'Go', 
    icon: '🐹', 
    color: 'bg-[#00ADD8] text-white', 
    description: 'Go simple main package',
    defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}'
  },
  { 
    id: 'rust', 
    name: 'Rust', 
    icon: '🦀', 
    color: 'bg-[#DEA584] text-black', 
    description: 'Safe and fast Rust starter',
    defaultCode: 'fn main() {\n    println!("Hello, World!");\n}'
  },
  { 
    id: 'ruby', 
    name: 'Ruby', 
    icon: '💎', 
    color: 'bg-[#CC342D] text-white', 
    description: 'Ruby script template',
    defaultCode: 'puts "Hello, World!"'
  },
  { 
    id: 'kotlin', 
    name: 'Kotlin', 
    icon: 'K', 
    color: 'bg-[#7F52FF] text-white', 
    description: 'Modern Kotlin starter',
    defaultCode: 'fun main() {\n    println("Hello, World!")\n}'
  }
];

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project name');
      return;
    }

    setIsSubmitting(true);
    try {
      // Backend api par data bhej rahe hain
      const response = await api.post('/projects', {
        title,
        description,
        language: selectedTemplate
      });

      // Success hone par parent component (Dashboard) ko naya project bhej denge
      if (onProjectCreated) {
        onProjectCreated(response.data);
      }
      
      // Form reset aur close karein
      setTitle('');
      setDescription('');
      onClose();

      // 3. MAIN FIX: Code Editor par bhejne ka logic
      const projectId = response.data._id || response.data.project?._id || response.data.id;
      if (projectId) {
        navigate(`/workspace/${projectId}`);
      } else {
        console.error("Project ID not found in response", response.data);
      }

    } catch (error) {
      console.error('Error creating project:', error);
      alert(error.response?.data?.message || 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] border border-gray-800 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreateProject}>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Enter Project Name</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Name"
                className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Enter Project Description</label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-[#00a65a] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Select Template</label>
              <div className="grid grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold ${template.color} ${selectedTemplate === template.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#161b22]' : 'opacity-80 hover:opacity-100 transition-opacity'}`}>
                      {template.icon}
                    </div>
                    <span className={`text-xs ${selectedTemplate === template.id ? 'text-white font-medium' : 'text-gray-400'}`}>
                      {template.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#00a65a] hover:bg-[#008f4d]'}`}
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <span>⊕</span>}
              {isSubmitting ? 'Creating & Opening IDE...' : 'Create & Open IDE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;