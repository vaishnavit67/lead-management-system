import React, { useState, useEffect } from 'react';
import LeadList from './components/LeadList';
import DashboardStats from './components/DashboardStats';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const refreshLeads = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="app">
      <div className="background-gradient"></div>
      
      <div className="container">
        <header className="header">
          <div className="logo-section">
            <div className="logo-icon">⚡</div>
            <div>
              <h1>LeadFlow</h1>
              <p>Lead Management System</p>
            </div>
          </div>
        </header>

        <DashboardStats refreshTrigger={refreshTrigger} />
        
        <LeadList 
          refreshTrigger={refreshTrigger}
          refreshLeads={refreshLeads}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
    </div>
  );
}

export default App;