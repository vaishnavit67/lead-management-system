import React, { useState, useEffect } from 'react';
import { getLeads } from '../services/api';
import LeadCard from './LeadCard';
import LeadForm from './LeadForm';
import './LeadList.css';

function LeadList({ refreshTrigger, refreshLeads, searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await getLeads();
      setLeads(res.data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [refreshTrigger]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.car_model?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    interested: leads.filter(l => l.status === 'Interested').length,
    purchased: leads.filter(l => l.status === 'Purchased').length,
    lost: leads.filter(l => l.status === 'Lost').length
  };

  return (
    <div className="lead-list-container">
      <div className="list-header">
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, phone, or car model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Interested">Interested</option>
            <option value="Test Drive">Test Drive</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Booked">Booked</option>
            <option value="Purchased">Purchased</option>
            <option value="Lost">Lost</option>
          </select>
          
          <button className="add-lead-btn" onClick={() => setShowForm(true)}>
            + Add New Lead
          </button>
        </div>

        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Leads</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.interested}</span>
            <span className="stat-label">Interested</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.purchased}</span>
            <span className="stat-label">Won</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.lost}</span>
            <span className="stat-label">Lost</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading leads...</p>
        </div>
      ) : (
        <>
          {filteredLeads.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No leads found</h3>
              <p>Click "Add New Lead" to get started</p>
            </div>
          ) : (
            <div className="leads-grid">
              {filteredLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onUpdate={refreshLeads} />
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <LeadForm 
          onAdd={() => {
            refreshLeads();
            setShowForm(false);
          }} 
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default LeadList;