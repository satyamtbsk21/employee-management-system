import React, {useState} from "react";
import axios from 'axios';

export function Add(){
    const [formData, setFormData] = useState({
        empId: '',
        empPassword: '',
        empName: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        }
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    async function addHandler(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/employees`, {
                ...formData,
            });
            
            setMessage(`✅ ${response.data.message}\nEmployee ID: ${response.data.employeeId}`);
            
            // Reset form
            setFormData({
                empId: '',
                empPassword: '',
                empName: '',
                position: '',
                department: '',
                email: '',
                phone: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: ''
                }
            });
            
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || err.message));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="add-employee-container">
            <h1>Add New Employee</h1>
            <p className="subtitle">Complete employee registration with all details</p>
            
            <form onSubmit={addHandler} className="employee-form">
                {/* Personal Information Section */}
                <div className="form-section">
                    <h3>👤 Personal Information</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Employee ID</label>
                            <input 
                                type="text" 
                                name="empId"
                                placeholder="EMP001"
                                value={formData.empId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="empPassword"
                                placeholder="Enter secure password"
                                value={formData.empPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                name="empName"
                                placeholder="Enter full name"
                                value={formData.empName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="employee@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group optional">
                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone"
                                placeholder="+91 9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Employment Details Section */}
                <div className="form-section">
                    <h3>💼 Employment Details</h3>
                    <div className="form-row">
                        <div className="form-group">
                </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Position</label>
                            <input 
                                type="text" 
                                name="position"
                                placeholder="Software Engineer"
                                value={formData.position}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input 
                                type="text" 
                                name="department"
                                placeholder="IT Department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="form-section">
                    <h3>🏠 Address Information</h3>
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Street Address</label>
                            <input 
                                type="text" 
                                name="address.street"
                                placeholder="123 Main Street"
                                value={formData.address.street}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <input 
                                type="text" 
                                name="address.city"
                                placeholder="New York"
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input 
                                type="text" 
                                name="address.state"
                                placeholder="NY"
                                value={formData.address.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>ZIP Code</label>
                            <input 
                                type="text" 
                                name="address.zipCode"
                                placeholder="10001"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading"></span>
                            Adding Employee...
                        </>
                    ) : (
                        <>
                            🚀 Add Employee
                        </>
                    )}
                </button>

                {/* Message Display */}
                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    )
}