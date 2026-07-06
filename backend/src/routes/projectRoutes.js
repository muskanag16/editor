// src/routes/projectRoutes.js
// const express = require('express');
// const router = express.Router();
// const Project = require('../models/Project');
// const { 
//   createProject, 
//   getUserProjects, 
//   getProjectById, 
//   updateProjectCode 
// } = require('../controllers/projectController');
// const { protect } = require('../middlewares/authMiddleware');

// // Get all projects & Create new project
// router.route('/')
//   .get(protect, getUserProjects)
//   .post(protect, createProject);

// // Get specific project
// router.route('/:id')
//   .get(protect, getProjectById);
// // backend/src/routes/projectRoutes.js ke andar

// // YEH WALA ROUTE PURANE WALE GET '/' KO REPLACE KAREGA
// // router.get('/', protect, async (req, res) => {
// //   try {
// //     // Aise projects dhundo jahan owner user khud ho OR user collaborator array mein ho
// //     const projects = await Project.find({
// //       $or: [
// //         { owner: req.user._id },
// //         { collaborators: req.user._id }
// //       ]
// //     }).sort({ updatedAt: -1 }); // Naye projects upar dikhane ke liye sort add kar diya hai
    
// //     res.json(projects);
// //   } catch (err) {
// //     console.error("Error fetching projects:", err);
// //     res.status(500).json({ message: "Server error while fetching projects" });
// //   }
// // });
// router.get('/', protect, async (req, res) => {
//   try {
//     // ❌ GALAT TARIQA: Yeh database ke saare projects utha layega
//     // const projects = await Project.find(); 

//     // ✅ SAHI TARIQA: Sirf user ke projects aur shared projects filter karo
//     const projects = await Project.find({
//       $or: [
//         { owner: req.user._id },
//         { collaborators: req.user._id }
//       ]
//     }).sort({ updatedAt: -1 }); // Naye wale upar dikhane ke liye

//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
// // Update code (Save button ya auto-save ke liye)
// router.route('/:id/code')
//   .put(protect, updateProjectCode);
// // backend/routes/projectRoutes.js (ya jahan bhi aapke project ke routes hain)
// router.get('/:id', async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }
//     // Yeh project ke sath uska 'code' bhi frontend ko bhej dega
//     res.json(project); 
//   } catch (error) {
//     console.error("GET Error:", error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// router.put('/:id', async (req, res) => {
//   try {
//     const projectId = req.params.id;
//     const { code } = req.body;

//     // Database mein update karo
//     const updatedProject = await Project.findByIdAndUpdate(
//       projectId,
//       { code: code }, // Jo frontend se naya code aaya hai wo set kar do
//       { new: true }
//     );

//     if (!updatedProject) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     res.status(200).json(updatedProject);
//   } catch (error) {
//     console.error("Save Error:", error);
//     res.status(500).json({ message: 'Error updating code' });
//   }
// });
// module.exports = router;
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middlewares/authMiddleware');

// 1. Get all projects (Filtered by user) & Create new project
router.route('/')
  .get(protect, async (req, res) => {
    try {
      // Sirf wahi projects dikhao jiske owner user hai ya collaborator hai
      const projects = await Project.find({
        $or: [
          { owner: req.user._id },
          { collaborators: req.user._id }
        ]
      }).sort({ updatedAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  })
  .post(protect, async (req, res) => {
    try {
      const { title, description, language } = req.body;
      const newProject = await Project.create({
        title,
        description,
        language,
        owner: req.user._id,
        collaborators: [req.user._id] // Owner ko automatically collaborator bana do
      });
      res.status(201).json(newProject);
    } catch (err) {
      res.status(500).json({ message: "Project create nahi hua" });
    }
  });

// 2. Specific project operations (GET, PUT)
router.route('/:id')
  .get(protect, async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
      
      // Security check: Kya user is project ka hissa hai?
      if (!project.collaborators.includes(req.user._id)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  })
  .put(protect, async (req, res) => {
    try {
      // Auto-save logic
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        { code: req.body.code },
        { new: true }
      );
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: 'Error updating code' });
    }
  });

module.exports = router;