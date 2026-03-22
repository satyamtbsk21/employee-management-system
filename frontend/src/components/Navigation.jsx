import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="nav-brand">
                <i className="fas fa-users"></i>
                Employee Management System
            </div>
            <div className="nav-links">
                <NavLink to="/" className="nav-link">
                    <i className="fas fa-plus"></i> Add
                </NavLink>
                <NavLink to="/login" className="nav-link">
                    <i className="fas fa-sign-in-alt"></i> Login
                </NavLink>
                <NavLink to="/punch" className="nav-link">
                    <i className="fas fa-clock"></i> Punch
                </NavLink>
                <NavLink to="/view-punch-record" className="nav-link">
                    <i className="fas fa-history"></i> View Records
                </NavLink>
                <NavLink to="/find" className="nav-link">
                    <i className="fas fa-search"></i> Find
                </NavLink>
                <NavLink to="/update" className="nav-link">
                    <i className="fas fa-edit"></i> Update
                </NavLink>
                <NavLink to="/delete" className="nav-link">
                    <i className="fas fa-trash"></i> Delete
                </NavLink>
                <NavLink to="/directory" className="nav-link">
                    <i className="fas fa-list"></i> Directory
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;