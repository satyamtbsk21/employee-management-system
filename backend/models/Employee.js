import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    // Basic Information
    empId: { type: String, required: true, unique: true },
    empPassword: { type: String, required: true },
    empName: { type: String, required: true },

    // Employment Details
    position: { type: String, required: true },
    department: { type: String, required: true },
    hireDate: { type: Date, default: Date.now },

    // Attendance Records (Array of punch times)
    punchRecords: [{
        date: { type: Date, default: Date.now },
        punchIn: String,
        punchOut: String,
        hoursWorked: Number
    }],

    // Contact Information
    email: { type: String, required: true, unique: true },
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },

    // System Fields
    isActive: { type: Boolean, default: true },
    lastLogin: Date

}, {
    timestamps: true
});

export default mongoose.model('Employee', employeeSchema);