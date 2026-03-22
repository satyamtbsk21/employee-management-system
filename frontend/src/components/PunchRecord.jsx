import React, {useState} from "react";
import axios from 'axios';

export function PunchRecord(){
    const [punchData, setPunchData] = useState({
        empId: '',
        punchIn: '',
        punchOut: '',
        hoursWorked: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPunchData({
            ...punchData,
            [e.target.name]: e.target.value
        });
    };

    async function punchHandler(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${punchData.empId}/punch`, {
                punchIn: punchData.punchIn,
                punchOut: punchData.punchOut,
                hoursWorked: parseFloat(punchData.hoursWorked)
            });
            
            setMessage(`✅ ${response.data.message}`);
            setPunchData({
                empId: '',
                punchIn: '',
                punchOut: '',
                hoursWorked: ''
            });
            
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || err.message));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="punch-record-container">
            <div className="punch-header">
                <h1>⏰ Punch Record</h1>
                <p className="subtitle">Track employee attendance and working hours</p>
            </div>
            
            <form onSubmit={punchHandler} className="punch-form">
                <div className="form-section">
                    <h3>👤 Employee Identification</h3>
                    <div className="form-group">
                        <label>
                            <i className="fas fa-id-card" style={{marginRight: '8px'}}></i>
                            Employee ID
                        </label>
                        <input 
                            type="text" 
                            name="empId"
                            placeholder="Enter Employee ID (e.g., EMP001)"
                            value={punchData.empId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>🕒 Time Tracking</h3>
                    <div className="time-grid">
                        <div className="time-card punch-in">
                            <div className="time-icon">
                                <i className="fas fa-sign-in-alt"></i>
                            </div>
                            <div className="form-group">
                                <label>Punch In Time</label>
                                <input 
                                    type="time" 
                                    name="punchIn"
                                    value={punchData.punchIn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="time-card punch-out">
                            <div className="time-icon">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <div className="form-group">
                                <label>Punch Out Time</label>
                                <input 
                                    type="time" 
                                    name="punchOut"
                                    value={punchData.punchOut}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>📊 Work Summary</h3>
                    <div className="hours-card">
                        <div className="hours-display">
                            <i className="fas fa-business-time"></i>
                            <div className="hours-info">
                                <label>Total Hours Worked</label>
                                <div className="hours-input-group">
                                    <input 
                                        type="number" 
                                        step="0.5"
                                        min="0"
                                        max="24"
                                        name="hoursWorked"
                                        placeholder="8.0"
                                        value={punchData.hoursWorked}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="hours-unit">hours</span>
                                </div>
                            </div>
                        </div>
                        <div className="hours-tip">
                            <small>💡 Tip: Use 0.5 increments (e.g., 7.5 for 7 hours 30 minutes)</small>
                        </div>
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="submit-btn punch-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading"></span>
                            Recording Attendance...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-fingerprint" style={{marginRight: '10px'}}></i>
                            Record Punch Entry
                        </>
                    )}
                </button>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </form>

            <div className="attendance-tips">
                <h4>📋 Attendance Guidelines</h4>
                <div className="tips-grid">
                    <div className="tip-item">
                        <i className="fas fa-check-circle"></i>
                        <span>Record accurate punch times</span>
                    </div>
                    <div className="tip-item">
                        <i className="fas fa-check-circle"></i>
                        <span>Include break times in calculations</span>
                    </div>
                    <div className="tip-item">
                        <i className="fas fa-check-circle"></i>
                        <span>Verify hours before submission</span>
                    </div>
                    <div className="tip-item">
                        <i className="fas fa-check-circle"></i>
                        <span>Update records daily</span>
                    </div>
                </div>
            </div>
        </div>
    )
}