import axios from "axios";
import { useState, useEffect } from "react";

export function FindAll(){
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchEmployees = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            const response = await axios.get('http://localhost:3001/api/employees');
            setEmployees(response.data);
            if (response.data.length === 0) {
                setMessage('ℹ️ No employees found in the system.');
            } else {
                setMessage(`✅ Found ${response.data.length} employee(s)`);
            }
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || err.message));
            setEmployees([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const refreshList = () => {
        fetchEmployees();
    };

    return(
        <div className="find-all-container">
            <div className="find-all-header">
                <h1>👥 All Employees</h1>
                <p className="subtitle">Complete list of all employees in the system</p>
            </div>

            <div className="actions-section">
                <button 
                    onClick={refreshList}
                    className="refresh-btn"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="loading small"></span>
                            Refreshing...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-sync-alt" style={{marginRight: '8px'}}></i>
                            Refresh List
                        </>
                    )}
                </button>
                
                <div className="employee-count">
                    <span className="count-badge">
                        {employees.length} employee{employees.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {message && (
                <div className={`message ${message.includes('✅') ? 'success' : message.includes('ℹ️') ? 'info' : 'error'}`}>
                    {message}
                </div>
            )}

            {isLoading ? (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading employee directory...</p>
                </div>
            ) : employees.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-users-slash"></i>
                    <h3>No Employees Found</h3>
                    <p>Add some employees to see them listed here.</p>
                </div>
            ) : (
                <div className="employees-grid">
                    {employees.map((emp) => (
                        <div key={emp._id || emp.empId} className="employee-card">
                            <div className="card-header">
                                <div className="avatar">
                                    <i className="fas fa-user-tie"></i>
                                </div>
                                <div className="employee-basic">
                                    <h3>{emp.empName}</h3>
                                    <p className="employee-id">{emp.empId}</p>
                                    <span className={`status-badge ${emp.isActive ? 'active' : 'inactive'}`}>
                                        {emp.isActive ? '🟢 Active' : '🔴 Inactive'}
                                    </span>
                                </div>
                            </div>

                            <div className="card-details">
                                <div className="detail-row">
                                    <span className="detail-label">Position</span>
                                    <span className="detail-value">{emp.position}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Department</span>
                                    <span className="detail-value">{emp.department}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value email">{emp.email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Phone</span>
                                    <span className="detail-value">{emp.phone || 'Not provided'}</span>
                                </div>
                            </div>

                          

                            {emp.lastLogin && (
                                <div className="last-login">
                                    <i className="fas fa-clock"></i>
                                    Last login: {new Date(emp.lastLogin).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="directory-info">
                <h4>📊 Directory Information</h4>
                <div className="info-grid">
                    <div className="info-item">
                        <i className="fas fa-users"></i>
                        <span>Total Employees: {employees.length}</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-user-check"></i>
                        <span>Active: {employees.filter(emp => emp.isActive).length}</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-user-clock"></i>
                        <span>Inactive: {employees.filter(emp => !emp.isActive).length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}