 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarPersonal from './components/SidebarPersonal';
import PersonalDetailsForm from './components/PersonalDetailsForm'; // Your personal details form
// import SidebarPersonal from './components/SidebarPersonal';

function App() {
  return (
    <Router>
      <div className="app-container">
        <SidebarPersonal />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />
            <Route path="/analytics" element={<h2>Analytics Page</h2>} />
            <Route path="/transactions" element={<h2>Transactions Page</h2>} />
            <Route path="/cards" element={<h2>Cards Page</h2>} />
            <Route path="/expenses" element={<h2>Expenses Page</h2>} />
            <Route path="/savings" element={<h2>Savings Page</h2>} />
            <Route path="/money-matters" element={<PersonalDetailsForm />} />
            <Route path="/verification-status" element={<h2>Verification Status Page</h2>} />
            <Route path="/seeking-money" element={<h2>Seeking Money Page</h2>} />
            <Route path="/settings" element={<h2>Settings Page</h2>} />
            <Route path="/help-center" element={<h2>Help Center Page</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
