import axios from "axios";
import { useState } from "react";

export function Update(){
    const [empId, setEmpId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [formData, setFormData] = useState({
        empName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    async function findEmployee() {
        if (!empId.trim()) {
            setMessage('❌ Please enter an Employee ID to search');
            return;
        }
        
        setIsSearching(true);
        setMessage('');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${empId}`);
            const emp = response.data;
            console.log('Employee found:', emp); // Debug log
            setEmployee(emp);
            setFormData({
                empName: emp.empName || '',
                email: emp.email || '',
                phone: emp.phone || '',
                position: emp.position || '',
                department: emp.department || '',
               
            });
            setMessage('✅ Employee found! Update the fields below.');
        } catch(err) {
            console.error('Error:', err); // Debug log
            setMessage("❌ Employee Not Found: " + (err.response?.data?.message || err.message));
            setEmployee(null);
        } finally {
            setIsSearching(false);
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function updateHandler(e) {
        e.preventDefault();
        if (!empId.trim()) {
            setMessage('❌ Please enter an Employee ID');
            return;
        }
        
        setIsUpdating(true);
        setMessage('');
        try {
            const updateData = {};
            
            if (formData.empName && formData.empName !== employee.empName) 
                updateData.empName = formData.empName;
            if (formData.email && formData.email !== employee.email) 
                updateData.email = formData.email;
            if (formData.phone !== employee.phone) 
                updateData.phone = formData.phone;
            if (formData.position && formData.position !== employee.position) 
                updateData.position = formData.position;
            if (formData.department && formData.department !== employee.department) 
                updateData.department = formData.department;
            if (Object.keys(updateData).length === 0) {
                setMessage('⚠️ No changes detected. Please modify at least one field.');
                return;
            }

            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${empId}`, updateData);
            setMessage("✅ " + response.data.message);
            findEmployee();
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || err.message));
        } finally {
            setIsUpdating(false);
        }
    }

    const resetForm = () => {
        setEmpId("");
        setFormData({
            empName: '',
            email: '',
            phone: '',
            position: '',
            department: '',
            annualIncome: '',
            monthlySalary: ''
        });
        setEmployee(null);
        setMessage('');
    };

    // Inline styles for quick fix
    const styles = {
        container: {
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            margin: '20px auto',
            maxWidth: '800px',
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
        searchSection: {
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            padding: '20px',
            borderRadius: '10px'
        },
        searchGroup: {
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
            minWidth: '50px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '15px'
        },
        label: {
            color: '#2c3e50',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center'
        },
        updateGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
        },
        actionButtons: {
            display: 'flex',
            gap: '15px',
            marginTop: '30px'
        },
        updateBtn: {
            flex: '2',
            background: '#f39c12',
            border: 'none',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
        },
        resetBtn: {
            flex: '1',
            background: '#95a5a6',
            border: 'none',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
        },
        message: {
            padding: '15px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '20px'
        },
        success: { background: 'rgba(46, 204, 113, 0.2)', color: '#27ae60', border: '1px solid #27ae60' },
        error: { background: 'rgba(231, 76, 60, 0.2)', color: '#c0392b', border: '1px solid #c0392b' },
        warning: { background: 'rgba(243, 156, 18, 0.2)', color: '#d35400', border: '1px solid #d35400' },
        preview: {
            background: 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '15px',
            marginTop: '30px'
        },
        previewGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
        },
        previewItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px'
        }
    };

    return(
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>✏️ Update Employee</h1>
                <p style={styles.subtitle}>Modify existing employee information</p>
            </div>
            
            <form onSubmit={updateHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={styles.formSection}>
                    <h3>🔍 Find Employee</h3>
                    <div style={styles.searchSection}>
                        <div>
                            <label style={styles.label}>
                                <i className="fas fa-search" style={{marginRight: '8px'}}></i>
                                Employee ID to Update
                            </label>
                            <div style={styles.searchGroup}>
                                <input 
                                    type="text" 
                                    placeholder="Enter Employee ID (e.g., EMP001)"
                                    value={empId}
                                    onChange={e => setEmpId(e.target.value)} 
                                    required
                                    style={styles.input}
                                />
                                <button 
                                    type="button"
                                    style={styles.searchBtn}
                                    onClick={findEmployee}
                                    disabled={!empId.trim() || isSearching}
                                >
                                    {isSearching ? '🔍 Searching...' : '🔍 Search'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {employee && (
                    <>
                        <div style={styles.formSection}>
                            <h3>👤 Personal Information</h3>
                            <div style={styles.updateGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-user" style={{marginRight: '8px'}}></i>
                                        Full Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="empName"
                                        placeholder="Enter new full name"
                                        value={formData.empName}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-envelope" style={{marginRight: '8px'}}></i>
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        placeholder="Enter new email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-phone" style={{marginRight: '8px'}}></i>
                                        Phone Number
                                    </label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        placeholder="Enter new phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={styles.formSection}>
                            <h3>💼 Employment Details</h3>
                            <div style={styles.updateGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-briefcase" style={{marginRight: '8px'}}></i>
                                        Position
                                    </label>
                                    <input 
                                        type="text" 
                                        name="position"
                                        placeholder="Enter new position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-building" style={{marginRight: '8px'}}></i>
                                        Department
                                    </label>
                                    <input 
                                        type="text" 
                                        name="department"
                                        placeholder="Enter new department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-money-bill-wave" style={{marginRight: '8px'}}></i>
                                        Annual Income ($)
                                    </label>
                                    <input 
                                        type="number" 
                                        name="annualIncome"
                                        placeholder="Enter new annual income"
                                        value={formData.annualIncome}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <i className="fas fa-wallet" style={{marginRight: '8px'}}></i>
                                        Monthly Salary ($)
                                    </label>
                                    <input 
                                        type="number" 
                                        name="monthlySalary"
                                        placeholder="Enter new monthly salary"
                                        value={formData.monthlySalary}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div style={styles.actionButtons}>
                    <button 
                        type="submit" 
                        style={styles.updateBtn}
                        disabled={isUpdating || !employee}
                    >
                        {isUpdating ? '🔄 Updating...' : '📝 Update Employee'}
                    </button>
                    
                    <button 
                        type="button" 
                        style={styles.resetBtn}
                        onClick={resetForm}
                    >
                        ❌ Clear All
                    </button>
                </div>

                {message && (
                    <div style={{
                        ...styles.message,
                        ...(message.includes('✅') ? styles.success : 
                            message.includes('⚠️') ? styles.warning : styles.error)
                    }}>
                        {message}
                    </div>
                )}
            </form>

            {employee && (
                <div style={styles.preview}>
                    <h4>📋 Current Employee Details</h4>
                    <div style={styles.previewGrid}>
                        <div style={styles.previewItem}>
                            <span>Employee ID</span>
                            <span style={{fontWeight: 'bold', color: '#f39c12'}}>{employee.empId}</span>
                        </div>
                        <div style={styles.previewItem}>
                            <span>Current Name</span>
                            <span style={{fontWeight: 'bold'}}>{employee.empName}</span>
                        </div>
                        <div style={styles.previewItem}>
                            <span>Current Email</span>
                            <span style={{fontWeight: 'bold'}}>{employee.email}</span>
                        </div>
                        <div style={styles.previewItem}>
                            <span>Current Position</span>
                            <span style={{fontWeight: 'bold'}}>{employee.position}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}