const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const PersonalDetails = require('./models/PersonalDetails'); // Import the model

const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');

// Check if the uploads directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://0.0.0.0:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5 MB

// POST route to handle form submissions with file upload
app.post('/api/personal-details', upload.single('idDocument'), async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const file = req.file; // Access the uploaded file

    if (!file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new personal details record, including the file path
    const details = new PersonalDetails({
      ...rest,
      password: hashedPassword,
      idDocumentPath: file.path // Store file path in the database
    });

    // Save to the database
    await details.save();
    res.status(201).send({ message: 'Personal details saved successfully with file', id: details._id });
  } catch (error) {
    console.error('Error saving personal details:', error);
    res.status(400).send({ message: 'Error saving personal details', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
