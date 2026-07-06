// src/controllers/projectController.js
const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, language } = req.body;

    const project = await Project.create({
      title,
      description,
      language: language || 'javascript',
      owner: req.user._id, // req.user protect middleware se aayega
      code: '// Start coding...' 
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    Get all projects for the logged in user
// @route   GET /api/projects
// @access  Private
// const getUserProjects = async (req, res) => {
//   try {
//     // Aise projects laao jiska owner current user ho, ya wo collaborator ho
//     const projects = await Project.find({
//       $or: [{ owner: req.user._id }, { collaborators: req.user._id }]
//     }).sort({ updatedAt: -1 }); // Latest pehle dikhega

//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching projects', error: error.message });
//   }
// };
export const getProjects = async (req, res) => {
  try {
    // req.user._id auth middleware (protect) se aani chahiye
    const userId = req.user._id; 

    // MongoDB query: Sirf wahi project lao jahan user ya toh owner hai ya collaborator
    const projects = await Project.find({
      $or: [
        { owner: userId },
        { collaborators: userId }
      ]
    }).sort({ updatedAt: -1 }); // Latest projects pehle dikhane ke liye

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get a single project by ID (Jab user editor open karega)
// @route   GET /api/projects/:id
// @access  Private
// const getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id)
//       .populate('owner', 'name email')
//       .populate('collaborators', 'name email');

//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching project', error: error.message });
//   }
// };
// projectController.js mein getProjectById function check karein
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Yahan ID ko String mein convert karke check karna zaroori hai
    const userId = req.user._id.toString();
    const ownerId = project.owner.toString();
    const isCollaborator = project.collaborators.some(c => c.toString() === userId);

    if (userId !== ownerId && !isCollaborator) {
      return res.status(403).json({ message: "Access denied" }); // Yahi 403 aapke frontend par popup laa raha hai
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update project code (Auto-save feature ke liye)
// @route   PUT /api/projects/:id/code
// @access  Private
const updateProjectCode = async (req, res) => {
  try {
    const { code } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.code = code;
    await project.save();

    res.json({ message: 'Code saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving code', error: error.message });
  }
};

module.exports = { createProject, getUserProjects, getProjectById, updateProjectCode };