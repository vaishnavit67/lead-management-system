import React, { useState, useEffect } from 'react';
import { getLeads } from '../services/api';
import './DashboardStats.css';

function DashboardStats({ refreshTrigger }) {
  const [stats, setStats] = useState({
    total: 0,
    bySource: {},
    byStatus: {},
    conversionRate: 0
  });

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    const res = await getLeads();
    const leads = res.data || [];
    
    const bySource = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {});
    
    const byStatus = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
    
    const purchased = leads.filter(l => l.status === 'Purchased').length;
    const conversionRate = leads.length ? ((purchased / leads.length) * 100).toFixed(1) : 0;
    
    setStats({
      total: leads.length,
      bySource,
      byStatus,
      conversionRate
    });
  };

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Leads</p>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats.conversionRate}%</h3>
            <p>Conversion Rate</p>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">📞</div>
          <div className="stat-content">
            <h3>{stats.bySource['Call'] || 0}</h3>
            <p>Call Leads</p>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3>{stats.bySource['WhatsApp'] || 0}</h3>
            <p>WhatsApp Leads</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;