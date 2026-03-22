import axios from "axios";
import { useState } from "react";

export function ViewPunchRecord(){
    const [empId, setEmpId] = useState("");
    const [punchRecords, setPunchRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [employee, setEmployee] = useState(null);

    const fetchPunchRecords = async () => {
        if (!empId.trim()) {
            setMessage('❌ Please enter an Employee ID');
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        try {
            // First get employee details
            const empResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${empId}`);
            setEmployee(empResponse.data);
            
            // Then get punch records
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${empId}/punch-records`);
            setPunchRecords(response.data);
            
            if (response.data.length === 0) {
                setMessage('ℹ️ No punch records found for this employee.');
            } else {
                setMessage(`✅ Found ${response.data.length} punch record(s)`);
            }
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || err.message));
            setPunchRecords([]);
            setEmployee(null);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSearch = () => {
        setEmpId("");
        setPunchRecords([]);
        setEmployee(null);
        setMessage('');
    };

    const calculateHours = (punchIn, punchOut) => {
        if (!punchIn || !punchOut) return 'N/A';
        
        const [inHours, inMinutes] = punchIn.split(':').map(Number);
        const [outHours, outMinutes] = punchOut.split(':').map(Number);
        
        const totalInMinutes = inHours * 60 + inMinutes;
        const totalOutMinutes = outHours * 60 + outMinutes;
        
        const diffMinutes = totalOutMinutes - totalInMinutes;
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        
        return `${hours}h ${minutes}m`;
    };

    // Inline styles for ViewPunchRecord component
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            margin: '20px auto',
            maxWidth: '1000px',
            border: '1px solid rgba(255,255,255,0.3)'
        },
        header: {
            textAlign: 'center',
            marginBottom: '30px'
        },
        title: {
            color: '#2c3e50',
            marginBottom: '10px',
            fontSize: '2.2rem'
        },
        subtitle: {
            color: '#7f8c8d',
            fontSize: '1.1rem'
        },
        formSection: {
            background: '#f8f9fa',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '20px',
            borderLeft: '4px solid #3498db'
        },
        searchGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        searchInputGroup: {
            display: 'flex',
            gap: '10px',
            alignItems: 'stretch'
        },
        input: {
            flex: '1',
            padding: '12px 15px',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '1rem',
            background: 'white'
        },
        searchBtn: {
            background: '#3498db',
            border: 'none',
            color: 'white',
            padding: '0 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            minWidth: '50px',
            fontSize: '1rem'
        },
        message: {
            padding: '15px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            textAlign: 'center',
            margin: '20px 0'
        },
        success: { 
            background: 'rgba(46, 204, 113, 0.2)', 
            color: '#27ae60', 
            border: '1px solid #27ae60' 
        },
        error: { 
            background: 'rgba(231, 76, 60, 0.2)', 
            color: '#c0392b', 
            border: '1px solid #c0392b' 
        },
        info: { 
            background: 'rgba(52, 152, 219, 0.2)', 
            color: '#2980b9', 
            border: '1px solid #2980b9' 
        },
        // Employee Summary Styles
        employeeSummary: {
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '20px'
        },
        summaryHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
        },
        avatar: {
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        },
        employeeInfo: {
            flex: '1'
        },
        employeeId: {
            opacity: '0.9',
            fontSize: '0.9rem',
            margin: '5px 0'
        },
        department: {
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 12px',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '500'
        },
        // Loading State
        loadingState: {
            textAlign: 'center',
            padding: '40px'
        },
        loadingSpinner: {
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
        },
        // Records Section
        recordsSection: {
            background: 'white',
            border: '1px solid #e9ecef',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '20px'
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid #f8f9fa'
        },
        recordsCount: {
            background: '#3498db',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
        },
        // Table Styles
        recordsTable: {
            border: '1px solid #e9ecef',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px'
        },
        tableHeader: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            background: '#34495e',
            color: 'white',
            padding: '15px',
            fontWeight: '600'
        },
        tableBody: {
            maxHeight: '400px',
            overflowY: 'auto'
        },
        tableRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            padding: '15px',
            borderBottom: '1px solid #e9ecef',
            alignItems: 'center'
        },
        tableRowEven: {
            background: '#f8f9fa'
        },
        // Summary Cards
        recordsSummary: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginTop: '20px'
        },
        summaryCard: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        },
        summaryInfo: {
            display: 'flex',
            flexDirection: 'column'
        },
        summaryLabel: {
            fontSize: '0.8rem',
            opacity: '0.9'
        },
        summaryValue: {
            fontSize: '1.5rem',
            fontWeight: '700'
        },
        // Empty State
        emptyState: {
            textAlign: 'center',
            padding: '40px',
            color: '#7f8c8d'
        },
        // Action Buttons
        actionButtons: {
            textAlign: 'center',
            marginTop: '20px'
        },
        resetBtn: {
            background: '#95a5a6',
            border: 'none',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem'
        },
        // Info Section
        punchInfo: {
            marginTop: '30px',
            textAlign: 'center'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            marginTop: '20px'
        },
        infoItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '15px',
            background: 'rgba(52, 152, 219, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(52, 152, 219, 0.2)'
        },
        label: {
            color: '#2c3e50',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px'
        }
    };

    // Add spin animation
    const spinAnimation = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return(
        <div style={styles.container}>
            <style>{spinAnimation}</style>
            
            <div style={styles.header}>
                <h1 style={styles.title}>📊 View Punch Records</h1>
                <p style={styles.subtitle}>Check employee attendance and working hours</p>
            </div>

            <div style={styles.formSection}>
                <h3>🔍 Search Employee Records</h3>
                <div style={styles.searchGroup}>
                    <label style={styles.label}>
                        <i className="fas fa-id-card" style={{marginRight: '8px'}}></i>
                        Employee ID
                    </label>
                    <div style={styles.searchInputGroup}>
                        <input 
                            type="text" 
                            placeholder="Enter Employee ID (e.g., EMP001)"
                            value={empId}
                            onChange={e => setEmpId(e.target.value)} 
                            required
                            style={styles.input}
                        />
                        <button 
                            style={styles.searchBtn}
                            onClick={fetchPunchRecords}
                            disabled={!empId.trim() || isLoading}
                        >
                            {isLoading ? '🔍 Searching...' : '🔍 Search'}
                        </button>
                    </div>
                </div>
            </div>

            {message && (
                <div style={{
                    ...styles.message,
                    ...(message.includes('✅') ? styles.success : 
                         message.includes('ℹ️') ? styles.info : styles.error)
                }}>
                    {message}
                </div>
            )}

            {employee && (
                <div style={styles.employeeSummary}>
                    <div style={styles.summaryHeader}>
                        <div style={styles.avatar}>
                            <i className="fas fa-user-tie"></i>
                        </div>
                        <div style={styles.employeeInfo}>
                            <h3 style={{margin: 0}}>{employee.empName}</h3>
                            <p style={styles.employeeId}>{employee.empId}</p>
                            <span style={styles.department}>
                                {employee.department} • {employee.position}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div style={styles.loadingState}>
                    <div style={styles.loadingSpinner}></div>
                    <p>Loading punch records...</p>
                </div>
            ) : punchRecords.length > 0 ? (
                <div style={styles.recordsSection}>
                    <div style={styles.sectionHeader}>
                        <h3 style={{margin: 0, color: '#2c3e50'}}>⏰ Attendance History</h3>
                        <span style={styles.recordsCount}>{punchRecords.length} records</span>
                    </div>
                    
                    <div style={styles.recordsTable}>
                        <div style={styles.tableHeader}>
                            <div>Date</div>
                            <div>Punch In</div>
                            <div>Punch Out</div>
                            <div>Hours Worked</div>
                            <div>Calculated</div>
                        </div>
                        
                        <div style={styles.tableBody}>
                            {punchRecords.map((record, index) => (
                                <div key={index} style={{
                                    ...styles.tableRow,
                                    ...(index % 2 === 0 ? styles.tableRowEven : {})
                                }}>
                                    <div>
                                        {new Date(record.date).toLocaleDateString()}
                                    </div>
                                    <div>
                                        {record.punchIn || 'Not recorded'}
                                    </div>
                                    <div>
                                        {record.punchOut || 'Not recorded'}
                                    </div>
                                    <div>
                                        {record.hoursWorked ? `${record.hoursWorked}h` : 'N/A'}
                                    </div>
                                    <div>
                                        {record.punchIn && record.punchOut ? 
                                            calculateHours(record.punchIn, record.punchOut) : 'N/A'
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.recordsSummary}>
                        <div style={styles.summaryCard}>
                            <i className="fas fa-clock" style={{fontSize: '1.5rem'}}></i>
                            <div style={styles.summaryInfo}>
                                <span style={styles.summaryLabel}>Total Records</span>
                                <span style={styles.summaryValue}>{punchRecords.length}</span>
                            </div>
                        </div>
                        <div style={styles.summaryCard}>
                            <i className="fas fa-calendar-check" style={{fontSize: '1.5rem'}}></i>
                            <div style={styles.summaryInfo}>
                                <span style={styles.summaryLabel}>Days Tracked</span>
                                <span style={styles.summaryValue}>
                                    {new Set(punchRecords.map(r => new Date(r.date).toDateString())).size}
                                </span>
                            </div>
                        </div>
                        <div style={styles.summaryCard}>
                            <i className="fas fa-business-time" style={{fontSize: '1.5rem'}}></i>
                            <div style={styles.summaryInfo}>
                                <span style={styles.summaryLabel}>Avg Hours/Day</span>
                                <span style={styles.summaryValue}>
                                    {(() => {
                                        const validRecords = punchRecords.filter(r => r.hoursWorked);
                                        if (validRecords.length === 0) return 'N/A';
                                        const avg = validRecords.reduce((sum, r) => sum + r.hoursWorked, 0) / validRecords.length;
                                        return `${avg.toFixed(1)}h`;
                                    })()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : employee && punchRecords.length === 0 ? (
                <div style={styles.emptyState}>
                    <i className="fas fa-clipboard-list" style={{fontSize: '3rem', marginBottom: '15px'}}></i>
                    <h3 style={{margin: '0 0 10px 0', color: '#2c3e50'}}>No Punch Records Found</h3>
                    <p style={{margin: 0, color: '#7f8c8d'}}>This employee doesn't have any attendance records yet.</p>
                </div>
            ) : null}

            {(employee || punchRecords.length > 0) && (
                <div style={styles.actionButtons}>
                    <button 
                        style={styles.resetBtn}
                        onClick={resetSearch}
                    >
                        <i className="fas fa-redo" style={{marginRight: '8px'}}></i>
                        New Search
                    </button>
                </div>
            )}

            <div style={styles.punchInfo}>
                <h4 style={{color: '#2c3e50', marginBottom: '20px'}}>💡 About Punch Records</h4>
                <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                        <i className="fas fa-info-circle" style={{color: '#3498db'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>Punch records track daily attendance</span>
                    </div>
                    <div style={styles.infoItem}>
                        <i className="fas fa-info-circle" style={{color: '#3498db'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>Both manual and calculated hours are shown</span>
                    </div>
                    <div style={styles.infoItem}>
                        <i className="fas fa-info-circle" style={{color: '#3498db'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>Records are stored per employee</span>
                    </div>
                    <div style={styles.infoItem}>
                        <i className="fas fa-info-circle" style={{color: '#3498db'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>Use the Punch Record page to add new entries</span>
                    </div>
                </div>
            </div>
        </div>
    )
}