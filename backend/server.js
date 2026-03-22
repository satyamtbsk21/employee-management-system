import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Employee from './models/Employee.js';

const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee-management-system';
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
}

connectDB();

// Enhanced Routes

// Add Employee with all fields
app.post('/api/employees', async(req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({
            "message": "Employee Saved Successfully",
            "employeeId": employee.empId
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Employee Login
app.post('/api/employees/login', async(req, res) => {
    try {
        const { empId, empPassword } = req.body;
        const employee = await Employee.findOne({ empId, empPassword });

        if (!employee) {
            return res.status(401).json({ message: 'Invalid Employee ID or Password' });
        }

        // Update last login
        employee.lastLogin = new Date();
        await employee.save();

        res.json({
            message: 'Login Successful',
            employee: {
                empId: employee.empId,
                empName: employee.empName,
                position: employee.position,
                department: employee.department
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add Punch Record
app.post('/api/employees/:id/punch', async(req, res) => {
    try {
        const employee = await Employee.findOne({ empId: req.params.id });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const punchRecord = {
            date: new Date(),
            punchIn: req.body.punchIn,
            punchOut: req.body.punchOut,
            hoursWorked: req.body.hoursWorked
        };

        employee.punchRecords.push(punchRecord);
        await employee.save();

        res.json({ message: 'Punch record added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Employee Punch Records
app.get('/api/employees/:id/punch-records', async(req, res) => {
    try {
        const employee = await Employee.findOne({ empId: req.params.id });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee.punchRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all employees
app.get('/api/employees', async(req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Debug route (optional)
app.get('/api/debug/all', async(req, res) => {
    try {
        const employees = await Employee.find();
        res.json({ total: employees.length, data: employees });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get employee by ID
app.get('/api/employees/:id', async(req, res) => {
    try {
        const employee = await Employee.findOne({ empId: req.params.id });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete employee
app.delete('/api/employees/:id', async(req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ empId: req.params.id });
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update employee
app.put('/api/employees/:id', async(req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate({ empId: req.params.id },
            req.body, { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Add this before your POST route
app.use('/api/employees', (req, res, next) => {
    if (req.method === 'POST') {
        // Remove salary fields if they exist
        delete req.body.monthlySalary;
        delete req.body.annualIncome;
        delete req.body.salary;
    }
    next();
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('🚀 Enhanced Employee Management System running on http://localhost:3001');
    console.log('💾 Using In-Memory MongoDB');
});