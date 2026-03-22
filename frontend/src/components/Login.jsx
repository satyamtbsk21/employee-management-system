import React, {useState} from "react";
import axios from 'axios';

export function Login(){
    const [credentials, setCredentials] = useState({
        empId: '',
        empPassword: ''
    });
    
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    async function loginHandler(e) {
        e.preventDefault();
        setIsLoggingIn(true);
        setMessage('');
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/employees/login`, credentials);
            setEmployee(response.data.employee);
            setMessage(`✅ ${response.data.message}\nWelcome ${response.data.employee.empName}!`);
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || err.message));
            setEmployee(null);
        } finally {
            setIsLoggingIn(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Employee Login</h1>
                <p className="subtitle">Access your employee account securely</p>
            </div>
            
            <form onSubmit={loginHandler} className="login-form">
                <div className="form-section">
                    <h3>🔐 Login Credentials</h3>
                    
                    <div className="form-group">
                        <label>
                            <i className="fas fa-id-card" style={{marginRight: '8px'}}></i>
                            Employee ID
                        </label>
                        <input 
                            type="text" 
                            name="empId"
                            placeholder="Enter your Employee ID"
                            value={credentials.empId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>
                            <i className="fas fa-lock" style={{marginRight: '8px'}}></i>
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="empPassword"
                            placeholder="Enter your password"
                            value={credentials.empPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? (
                        <>
                            <span className="loading"></span>
                            Authenticating...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-sign-in-alt" style={{marginRight: '10px'}}></i>
                            Login to Dashboard
                        </>
                    )}
                </button>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                )}
            </form>

            {employee && (
                <div className="employee-welcome-card">
                    <div className="welcome-header">
                        <i className="fas fa-check-circle"></i>
                        <h3>Login Successful!</h3>
                    </div>
                    <div className="employee-info">
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Welcome</span>
                                <span className="info-value highlight">{employee.empName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Employee ID</span>
                                <span className="info-value">{employee.empId}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Position</span>
                                <span className="info-value">{employee.position}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Department</span>
                                <span className="info-value">{employee.department}</span>
                            </div>
                        </div>
                    </div>
                    <div className="welcome-footer">
                        <p>You now have access to all employee features</p>
                    </div>
                </div>
            )}

            <div className="login-features">
                <h4>🔒 Secure Login Features</h4>
                <div className="features-grid">
                    <div className="feature-item">
                        <i className="fas fa-shield-alt"></i>
                        <span>Encrypted Connection</span>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-user-shield"></i>
                        <span>Role-based Access</span>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-clock"></i>
                        <span>Session Management</span>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-history"></i>
                        <span>Activity Tracking</span>
                    </div>
                </div>
            </div>
        </div>
    )
}