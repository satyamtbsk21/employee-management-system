import axios from "axios";
import { useState } from "react";

export function Find(){
    const [id, setId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    async function findHandler(e) {
        e.preventDefault();
        if (!id.trim()) {
            setMessage('❌ Please enter an Employee ID');
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
            setEmployee(response.data);
            setMessage('✅ Employee found successfully!');
        } catch(err) {
            setMessage("❌ Employee Not Found: " + (err.response?.data?.message || err.message));
            setEmployee(null);
        } finally {
            setIsLoading(false);
        }
    }

    const resetSearch = () => {
        setId('');
        setEmployee(null);
        setMessage('');
    };

    return(
        <div className="find-employee-container">
            <div className="find-header">
                <h1>🔍 Find Employee</h1>
                <p className="subtitle">Search for employee details using their ID</p>
            </div>
            
            <form onSubmit={findHandler} className="find-form">
                <div className="form-section">
                    <h3>📋 Search Criteria</h3>
                    <div className="search-box">
                        <div className="form-group">
                            <label>
                                <i className="fas fa-id-card" style={{marginRight: '8px'}}></i>
                                Employee ID
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter Employee ID (e.g., EMP001)"
                                value={id}
                                onChange={e => setId(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                </div>
                
                <div className="action-buttons">
                    <button 
                        type="submit" 
                        className="submit-btn search-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading"></span>
                                Searching Database...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-search" style={{marginRight: '10px'}}></i>
                                Find Employee
                            </>
                        )}
                    </button>
                    
                    {(employee || message) && (
                        <button 
                            type="button" 
                            className="reset-btn"
                            onClick={resetSearch}
                        >
                            <i className="fas fa-redo" style={{marginRight: '8px'}}></i>
                            New Search
                        </button>
                    )}
                </div>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </form>
            
            {employee && (
                <div className="employee-profile-card">
                    <div className="profile-header">
                        <div className="avatar">
                            <i className="fas fa-user-tie"></i>
                        </div>
                        <div className="profile-info">
                            <h3>{employee.empName}</h3>
                            <p className="employee-id">{employee.empId}</p>
                            <span className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                                {employee.isActive ? '🟢 Active' : '🔴 Inactive'}
                            </span>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="details-grid">
                            <div className="detail-section">
                                <h4>👤 Personal Information</h4>
                                <div className="detail-item">
                                    <span className="detail-label">Full Name</span>
                                    <span className="detail-value">{employee.empName}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Employee ID</span>
                                    <span className="detail-value highlight">{employee.empId}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value">{employee.email}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Phone</span>
                                    <span className="detail-value">{employee.phone || 'Not provided'}</span>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>💼 Employment Details</h4>
                                <div className="detail-item">
                                    <span className="detail-label">Position</span>
                                    <span className="detail-value">{employee.position}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Department</span>
                                    <span className="detail-value">{employee.department}</span>
                                </div>
                               
                            </div>
                        </div>

                        {employee.address && (employee.address.street || employee.address.city) && (
                            <div className="address-section">
                                <h4>🏠 Address Information</h4>
                                <div className="address-details">
                                    {employee.address.street && <div>{employee.address.street}</div>}
                                    {(employee.address.city || employee.address.state) && (
                                        <div>
                                            {employee.address.city}{employee.address.city && employee.address.state ? ', ' : ''}{employee.address.state}
                                        </div>
                                    )}
                                    {employee.address.zipCode && <div>{employee.address.zipCode}</div>}
                                </div>
                            </div>
                        )}

                        <div className="system-info">
                            <h4>⚙️ System Information</h4>
                            <div className="system-grid">
                                <div className="system-item">
                                    <span className="system-label">Account Status</span>
                                    <span className={`system-value ${employee.isActive ? 'active' : 'inactive'}`}>
                                        {employee.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                {employee.lastLogin && (
                                    <div className="system-item">
                                        <span className="system-label">Last Login</span>
                                        <span className="system-value">
                                            {new Date(employee.lastLogin).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                                {employee.createdAt && (
                                    <div className="system-item">
                                        <span className="system-label">Member Since</span>
                                        <span className="system-value">
                                            {new Date(employee.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="search-tips">
                <h4>💡 Search Tips</h4>
                <div className="tips-list">
                    <div className="tip">
                        <i className="fas fa-lightbulb"></i>
                        <span>Enter exact Employee ID for best results</span>
                    </div>
                    <div className="tip">
                        <i className="fas fa-lightbulb"></i>
                        <span>Check for typos in the Employee ID</span>
                    </div>
                    <div className="tip">
                        <i className="fas fa-lightbulb"></i>
                        <span>Contact admin if employee is not found</span>
                    </div>
                </div>
            </div>
        </div>
    )
}