const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite' // Path to the SQLite file
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
