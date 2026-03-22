import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Add } from './components/Add';
import { Login } from './components/Login';
import { PunchRecord } from './components/PunchRecord';
import { ViewPunchRecord } from './components/ViewPunchRecord';
import { Find } from './components/Find';
import { Update } from './components/Update';
import { Delete } from './components/Delete';
import { FindAll } from './components/FindAll';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/login" element={<Login />} />
            <Route path="/punch" element={<PunchRecord />} />
            <Route path="/view-punch-record" element={<ViewPunchRecord />} />
            <Route path="/find" element={<Find />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/directory" element={<FindAll />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;