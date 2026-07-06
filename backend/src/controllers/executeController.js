// src/controllers/executeController.js
const axios = require('axios');

// @desc    Execute code via Piston Public API
// @route   POST /api/execute
// @access  Private
const executeCode = async (req, res) => {
  const { code, language, input } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Code is required' });
  }

  // Piston v2 API requires specific language names and versions.
  // Yeh standard stable versions hain jo Piston hamesha support karta hai.
  const languageMap = {
    'javascript': { language: 'javascript', version: '18.15.0' },
    'python': { language: 'python', version: '3.10.0' },
    'c++': { language: 'c++', version: '10.2.0' },
    'cpp': { language: 'c++', version: '10.2.0' },
    'c': { language: 'c', version: '10.2.0' },
    'java': { language: 'java', version: '15.0.2' }
  };

  // Agar user ne aisi language select ki jo map mein nahi hai, toh default JS run hoga
  const langConfig = languageMap[language.toLowerCase()] || languageMap['javascript'];

  try {
    const startTime = Date.now();

    // Send code to Piston API
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: langConfig.language,
      version: langConfig.version,
      files: [
        {
          content: code
        }
      ],
      stdin: input || ''
    });

    const endTime = Date.now();
    // Calculate round-trip time (in milliseconds)
    const executionTime = endTime - startTime; 

    // Piston API response sends results inside the "run" object
    const result = response.data.run;

    res.json({
      output: result.stdout || '',
      error: result.stderr || (result.code !== 0 ? result.output : ''),
      time: executionTime, // Calculated time
      memory: 'N/A' // Piston's public API natively memory usage provide nahi karta
    });

  } catch (error) {
    console.error('Piston Execution Error:', error);
    res.status(500).json({ message: 'Error executing code', error: error.message });
  }
};

module.exports = { executeCode };