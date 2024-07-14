const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define Employee model
const Employee = sequelize.define('Employee', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync database
sequelize.sync().then(() => {
  console.log("Connected to SQLite database");
}).catch((err) => {
  console.error("Error connecting to SQLite database:", err);
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await Employee.create({ email, password: hashedPassword });
    res.status(201).json(newEmployee); // Respond with saved employee data
  } catch (err) {
    console.error('Error saving employee:', err);
    res.status(500).json({ error: 'Failed to register employee' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', employee });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Failed to login employee' });
  }
});

app.post('/generate', (req, res) => {
  const { courseName, courseCode, questions } = req.body;

  if (!courseName || !courseCode || !questions) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.contentType('application/pdf');
      res.send(pdfData);
    });

    // Add content to the PDF
    // const logoPath = './assets/makaut.jpg'; // Adjust this path to your actual image location
    // doc.image(logoPath, 45, 705, { width: 100, height: 100 });

    const universityName = "Maulana Abul Kalam Azad University of Technology (In House),MAKAUT";
    const universityAddress = "NH-12(Old NH-34)Simhat, Haringhata,Nadia,Pin-741249,West Benagl";
    doc.fontSize(12).text(universityAddress, 180, 740);
    doc.fontSize(16).text(universityName, 180, 760, { bold: true });

    const examHeading = "End Semester Exam - June-July 2024";
    doc.fontSize(16).text(examHeading, 50, 700, { bold: true });

    doc.fontSize(12).text(`Course Name: ${courseName}`, 50, 680);
    doc.text(`Course Code: ${courseCode}`, 50, 665);
    doc.text("Questions:", 50, 640);

    questions.split('\n').forEach((line, index) => {
      doc.text(line, 50, 620 - (index * 20));
    });

    doc.end();
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
