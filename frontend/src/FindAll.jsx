import axios from "axios";
import { useState, useEffect } from "react";

export function FindAll() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    async function fetchEmployees() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees`);
            setEmployees(response.data);
        } catch (err) {
            alert("Error fetching employees: " + err);
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Employees</h2>
            <hr />
            {employees.length === 0 ? (
                <p>No employees found</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Employee No</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp._id}>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{emp._id}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{emp.empNo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}