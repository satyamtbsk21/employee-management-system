import axios from "axios";
import { useState } from "react";

export function Delete(){
    const [id, setId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [message, setMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    
    async function findEmployee() {
        if (!id.trim()) {
            setMessage('❌ Please enter an Employee ID');
            return;
        }
        
        setIsSearching(true);
        setMessage('');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
            setEmployee(response.data);
            setMessage('✅ Employee found. Review details below before deletion.');
        } catch(err) {
            setMessage("❌ Employee Not Found: " + (err.response?.data?.message || err.message));
            setEmployee(null);
        } finally {
            setIsSearching(false);
        }
    }

    async function deleteEmployee() {
        if (!employee) return;
        
        setIsDeleting(true);
        setMessage('');
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
            setMessage("✅ " + response.data.message);
            setEmployee(null);
            setId("");
            setShowConfirm(false);
        } catch(err) {
            setMessage("❌ Error: " + (err.response?.data?.message || "Failed to delete employee"));
        } finally {
            setIsDeleting(false);
        }
    };

    const resetForm = () => {
        setId("");
        setEmployee(null);
        setMessage('');
        setShowConfirm(false);
    };

    const showConfirmation = () => {
        if (employee) {
            setShowConfirm(true);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setMessage('ℹ️ Deletion cancelled.');
    };

    // Inline styles for Delete component
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
            borderLeft: '4px solid #e74c3c'
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
        message: {
            padding: '15px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '20px'
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
        warning: { 
            background: 'rgba(243, 156, 18, 0.2)', 
            color: '#d35400', 
            border: '1px solid #d35400' 
        },
        // Confirmation Dialog Styles
        confirmationDialog: {
            background: '#fff3cd',
            border: '2px solid #ffeaa7',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '20px'
        },
        warningHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#e74c3c',
            marginBottom: '20px'
        },
        employeeToDelete: {
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #e9ecef'
        },
        employeeDetails: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginTop: '15px'
        },
        detailItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        },
        detailLabel: {
            fontSize: '0.8rem',
            color: '#7f8c8d',
            fontWeight: '500'
        },
        detailValue: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#2c3e50'
        },
        warningMessage: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '15px',
            background: 'rgba(231, 76, 60, 0.1)',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #e74c3c'
        },
        confirmationButtons: {
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end'
        },
        cancelBtn: {
            background: '#95a5a6',
            border: 'none',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
        },
        deleteConfirmBtn: {
            background: '#e74c3c',
            border: 'none',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
        },
        // Employee Preview Styles
        employeePreview: {
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '20px'
        },
        previewHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
        },
        detailGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
        },
        detailCard: {
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
        },
        highlight: {
            color: '#f39c12',
            fontWeight: '700'
        },
        statusBadge: {
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600'
        },
        active: {
            background: '#27ae60',
            color: 'white'
        },
        inactive: {
            background: '#e74c3c',
            color: 'white'
        },
        previewActions: {
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
        },
        proceedDeleteBtn: {
            background: '#e74c3c',
            border: 'none',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
        },
        cancelSearchBtn: {
            background: '#95a5a6',
            border: 'none',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
        },
        // Guidelines Styles
        guidelines: {
            marginTop: '30px',
            textAlign: 'center'
        },
        guidelinesList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        guideline: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderRadius: '10px'
        },
        guidelineWarning: {
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid #e74c3c'
        }
    };

    return(
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🗑️ Delete Employee</h1>
                <p style={styles.subtitle}>Remove an employee from the system</p>
            </div>
            
            {!showConfirm ? (
                <form onSubmit={(e) => { e.preventDefault(); findEmployee(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={styles.formSection}>
                        <h3>🔍 Find Employee to Delete</h3>
                        <div style={styles.searchSection}>
                            <div>
                                <label style={{color: '#2c3e50', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                    <i className="fas fa-search" style={{marginRight: '8px'}}></i>
                                    Employee ID
                                </label>
                                <div style={styles.searchGroup}>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Employee ID to delete"
                                        value={id}
                                        onChange={e => setId(e.target.value)} 
                                        required
                                        style={styles.input}
                                    />
                                    <button 
                                        type="submit"
                                        style={styles.searchBtn}
                                        disabled={!id.trim() || isSearching}
                                    >
                                        {isSearching ? '🔍 Searching...' : '🔍 Search'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div style={{
                            ...styles.message,
                            ...(message.includes('✅') ? styles.success : styles.error)
                        }}>
                            {message}
                        </div>
                    )}
                </form>
            ) : (
                <div style={styles.confirmationDialog}>
                    <div style={styles.warningHeader}>
                        <i className="fas fa-exclamation-triangle" style={{fontSize: '1.5rem'}}></i>
                        <h3 style={{margin: 0, color: '#e74c3c'}}>Confirm Deletion</h3>
                    </div>
                    
                    <div style={styles.employeeToDelete}>
                        <h4 style={{margin: '0 0 15px 0', color: '#2c3e50'}}>Employee to be deleted:</h4>
                        <div style={styles.employeeDetails}>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Employee ID:</span>
                                <span style={styles.detailValue}>{employee.empId}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Name:</span>
                                <span style={styles.detailValue}>{employee.empName}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Position:</span>
                                <span style={styles.detailValue}>{employee.position}</span>
                            </div>
                            <div style={styles.detailItem}>
                                <span style={styles.detailLabel}>Department:</span>
                                <span style={styles.detailValue}>{employee.department}</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.warningMessage}>
                        <i className="fas fa-skull-crossbones" style={{fontSize: '1.2rem', color: '#e74c3c'}}></i>
                        <div>
                            <strong style={{color: '#e74c3c'}}>This action cannot be undone!</strong>
                            <p style={{margin: '5px 0 0 0', color: '#2c3e50'}}>All employee data, including attendance records and personal information, will be permanently deleted.</p>
                        </div>
                    </div>

                    <div style={styles.confirmationButtons}>
                        <button 
                            style={styles.cancelBtn}
                            onClick={cancelDelete}
                            disabled={isDeleting}
                        >
                            <i className="fas fa-times" style={{marginRight: '8px'}}></i>
                            Cancel
                        </button>
                        <button 
                            style={styles.deleteConfirmBtn}
                            onClick={deleteEmployee}
                            disabled={isDeleting}
                        >
                            {isDeleting ? '🔄 Deleting...' : '🗑️ Yes, Delete Permanently'}
                        </button>
                    </div>
                </div>
            )}

            {employee && !showConfirm && (
                <div style={styles.employeePreview}>
                    <div style={styles.previewHeader}>
                        <i className="fas fa-user-circle" style={{fontSize: '1.5rem'}}></i>
                        <h4 style={{margin: 0}}>Employee Found</h4>
                    </div>
                    <div style={styles.previewDetails}>
                        <div style={styles.detailGrid}>
                            <div style={styles.detailCard}>
                                <span style={styles.detailLabel}>Employee ID</span>
                                <span style={{...styles.detailValue, ...styles.highlight}}>{employee.empId}</span>
                            </div>
                            <div style={styles.detailCard}>
                                <span style={styles.detailLabel}>Full Name</span>
                                <span style={styles.detailValue}>{employee.empName}</span>
                            </div>
                            <div style={styles.detailCard}>
                                <span style={styles.detailLabel}>Position</span>
                                <span style={styles.detailValue}>{employee.position}</span>
                            </div>
                            <div style={styles.detailCard}>
                                <span style={styles.detailLabel}>Department</span>
                                <span style={styles.detailValue}>{employee.department}</span>
                            </div>
                            <div style={styles.detailCard}>
                                <span style={styles.detailLabel}>Email</span>
                                <span style={styles.detailValue}>{employee.email}</span>
                            </div>
                            <div style={styles.detailCard}>
                                <span style={styles.detailLabel}>Status</span>
                                <span style={{
                                    ...styles.statusBadge,
                                    ...(employee.isActive ? styles.active : styles.inactive)
                                }}>
                                    {employee.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={styles.previewActions}>
                        <button 
                            style={styles.proceedDeleteBtn}
                            onClick={showConfirmation}
                        >
                            <i className="fas fa-trash-alt" style={{marginRight: '8px'}}></i>
                            Proceed to Delete
                        </button>
                        <button 
                            style={styles.cancelSearchBtn}
                            onClick={resetForm}
                        >
                            <i className="fas fa-times" style={{marginRight: '8px'}}></i>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.guidelines}>
                <h4 style={{color: '#2c3e50', marginBottom: '20px'}}>⚠️ Important Notes</h4>
                <div style={styles.guidelinesList}>
                    <div style={{...styles.guideline, ...styles.guidelineWarning}}>
                        <i className="fas fa-ban" style={{color: '#e74c3c'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>This action is permanent and cannot be undone</span>
                    </div>
                    <div style={{...styles.guideline, ...styles.guidelineWarning}}>
                        <i className="fas fa-database" style={{color: '#e74c3c'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>All employee records will be permanently deleted</span>
                    </div>
                    <div style={{...styles.guideline, ...styles.guidelineWarning}}>
                        <i className="fas fa-history" style={{color: '#e74c3c'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>Attendance history and punch records will be lost</span>
                    </div>
                    <div style={{...styles.guideline, ...styles.guidelineWarning}}>
                        <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                        <span style={{color: '#2c3e50', fontWeight: '500'}}>Double-check the Employee ID before proceeding</span>
                    </div>
                </div>
            </div>

            {message && !showConfirm && (
                <div style={{
                    ...styles.message,
                    ...(message.includes('✅') ? styles.success : styles.error)
                }}>
                    {message}
                </div>
            )}
        </div>
    )
}