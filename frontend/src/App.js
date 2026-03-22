import { Add } from "./components/Add.jsx";
import { Delete } from "./components/Delete.jsx";
import { Find } from "./components/Find.jsx";
import { FindAll } from "./components/FindAll.jsx";
import { Update } from "./components/Update.jsx";
import { Login } from "./components/Login.jsx";
import { PunchRecord } from "./components/PunchRecord.jsx";
import { ViewPunchRecord } from "./components/ViewPunchRecord.jsx";
import { NavLink, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
    return ( <
        div className = "App" >
        <
        h1 >
        <
        i className = "fas fa-users"
        style = {
            { marginRight: '15px' }
        } > < /i>
        Enhanced Employee Management System <
        /h1> <
        nav >
        <
        NavLink to = "/" >
        <
        i className = "fas fa-plus"
        style = {
            { marginRight: '8px' }
        } > < /i>
        Add Employee <
        /NavLink> <
        NavLink to = "/login" >
        <
        i className = "fas fa-sign-in-alt"
        style = {
            { marginRight: '8px' }
        } > < /i>
        Login <
        /NavLink> <
        NavLink to = "/punch" >
        <
        i className = "fas fa-clock"
        style = {
            { marginRight: '8px' }
        } > < /i>
        Punch Record <
        /NavLink> <
        NavLink to = "/ViewPunchRecord" >
        <
        i className = "fas fa-history"
        style = {
            { marginRight: '8px' }
        } > < /i>
        View Records <
        /NavLink> <
        NavLink to = "/Find" >
        <
        i className = "fas fa-search"
        style = {
            { marginRight: '8px' }
        } > < /i>
        Find <
        /NavLink> <
        NavLink to = "/Update" >
        <
        i className = "fas fa-edit"
        style = {
            { marginRight: '8px' }
        } > < /i>
        Update <
        /NavLink> <
        NavLink to = "/Delete" >
        <
        i className = "fas fa-trash"
        style = {
            { marginRight: '8px' }
        } > < /i>
        Delete <
        /NavLink> <
        NavLink to = "/FindAll" >
        <
        i className = "fas fa-list"
        style = {
            { marginRight: '8px' }
        } > < /i>
        All Employees <
        /NavLink> < /
        nav > <
        Routes >
        <
        Route path = "/"
        element = { < Add / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/punch"
        element = { < PunchRecord / > }
        /> <
        Route path = "/ViewPunchRecord"
        element = { < ViewPunchRecord / > }
        /> <
        Route path = "/Find"
        element = { < Find / > }
        /> <
        Route path = "/Update"
        element = { < Update / > }
        /> <
        Route path = "/Delete"
        element = { < Delete / > }
        /> <
        Route path = "/FindAll"
        element = { < FindAll / > }
        /> < /
        Routes > <
        /div>
    );
}

export default App;