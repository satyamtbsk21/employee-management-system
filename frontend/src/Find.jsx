import axios from "axios";
import { useState } from "react";

export function Find(){
    const [id, setId] = useState("");
    const [employee, setEmployee] = useState(null);
    
    async function findHandler(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
            setEmployee(response.data);
        } catch(err) {
            alert("Employee Not Found: " + err);
            setEmployee(null);
        }
    }

    return(
        <div className="content">
            <h2>Find Employee By ID</h2>
            <form onSubmit={findHandler} className="form-container">
                <div className="form-group">
                    <label>Employee ID:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Employee ID" 
                        value={id} 
                        onChange={e => setId(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">Find Employee</button>
            </form>
            
            {employee && (
                <div className="card">
                    <h3>Employee Details</h3>
                    <p><strong>ID:</strong> {employee._id}</p>
                    <p><strong>Employee No:</strong> {employee.empNo}</p>
                    <p><strong>Name:</strong> {employee.empName}</p>
                </div>
            )}
        </div>
    )
}