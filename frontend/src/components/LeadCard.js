import React, { useState } from 'react';
import { updateLead, deleteLead } from '../services/api';
import './LeadCard.css';

const statusColors = {
  'New': '#6366f1',
  'Interested': '#3b82f6',
  'Test Drive': '#8b5cf6',
  'Negotiation': '#f59e0b',
  'Booked': '#10b981',
  'Purchased': '#059669',
  'Lost': '#ef4444'
};

function LeadCard({ lead, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    await updateLead(lead.id, { status: newStatus });
    onUpdate();
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete lead: ${lead.name}?`)) {
      await deleteLead(lead.id);
      onUpdate();
    }
  };

  const getSourceIcon = (source) => {
    const icons = {
      'Walk-in': '🚶',
      'Call': '📞',
      'WhatsApp': '💬',
      'Website': '🌐',
      'Referral': '🤝'
    };
    return icons[source] || '📌';
  };

  return (
    <div className="lead-card" onMouseEnter={() => setShowNotes(true)} onMouseLeave={() => setShowNotes(false)}>
      <div className="card-header">
        <div className="lead-info">
          <div className="lead-avatar">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3>{lead.name}</h3>
            <div className="lead-details">
              <span className="phone">{lead.phone}</span>
              <span className="car-model">🚗 {lead.car_model || 'Not specified'}</span>
            </div>
          </div>
        </div>
        <div className="source-badge">
          {getSourceIcon(lead.source)} {lead.source}
        </div>
      </div>

      <div className="card-body">
        <div className="status-section">
          <label>Status</label>
          <select 
            value={lead.status || 'New'} 
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            style={{ backgroundColor: statusColors[lead.status || 'New'] + '20', borderColor: statusColors[lead.status || 'New'] }}
          >
            <option>New</option>
            <option>Interested</option>
            <option>Test Drive</option>
            <option>Negotiation</option>
            <option>Booked</option>
            <option>Purchased</option>
            <option>Lost</option>
          </select>
        </div>

        {lead.budget && (
          <div className="budget-info">
            💰 Budget: {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR'
            }).format(lead.budget)}
          </div>
        )}

        <button className="delete-btn" onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>

      {showNotes && lead.notes && (
        <div className="notes-tooltip">
          📝 {lead.notes}
        </div>
      )}
    </div>
  );
}

export default LeadCard;