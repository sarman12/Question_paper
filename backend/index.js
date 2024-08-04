const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const PDFDocument = require('pdfkit');
const fs = require('fs');

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

app.post('/generate', (req, res) => {
  const { courseName, courseCode, questions } = req.body;

  if (!courseName || !courseCode || !questions) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Disposition', 'attachment; filename="exam.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // University details and exam heading
    const universityName = "Maulana Abul Kalam Azad University of Technology (In House), MAKAUT";
    const universityAddress = "NH-12 (Old NH-34), Simhat, Haringhata, Nadia, Pin-741249, West Bengal";
    const examHeading = "End Semester Exam - June-July 2024";
    const examTime = "Exam Time: 10am to 1pm";

    // University Address (right-aligned and outside the border)
    doc.fontSize(8).text(universityAddress, 0, 30, { align: 'right' });

    // University Name (center-aligned)
    doc.fontSize(18).text(universityName, 50, 50, { align: 'center', bold: true });

    // Exam Heading (right-aligned) and Exam Time (left-aligned)
    doc.fontSize(12).text(examHeading, 0, 110, { align: 'right', bold: true });
    doc.text(examTime, 50, 110, { align: 'left', bold: true });

    // Course details and questions
    doc.fontSize(12).text(`Course Name: ${courseName}`, 50, 130);
    doc.text(`Course Code: ${courseCode}`, 50, 150);

    // Draw a line
    doc.moveTo(50, 170).lineTo(550, 170).stroke();

    // Questions
    doc.moveDown(2); // Add some space after the line
    doc.text("Questions:", 50, 190);

    // Split and add questions
    doc.moveDown();
    questions.split('\n').forEach((line, index) => {
      doc.text(`${index + 1}. ${line}`, 50, 210 + index * 20);
      doc.moveDown(1); // Add some space between questions
    });

    // Add footer with page numbers
    doc.on('pageAdded', () => {
      doc.fontSize(12).text('Page ' + doc.page.number, { align: 'center' });
    });

    doc.pipe(res);
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
