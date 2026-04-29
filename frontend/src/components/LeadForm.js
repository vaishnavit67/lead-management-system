import React, { useState } from 'react';
import { addLead } from '../services/api';
import './LeadForm.css';

function LeadForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    car_model: '',
    source: 'Walk-in',
    email: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.phone) {
      alert('✨ Please fill in name and phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      await addLead(form);
      setForm({ name: '', phone: '', car_model: '', source: 'Walk-in', email: '', budget: '' });
      onAdd();
      if (onClose) onClose();
    } catch (error) {
      alert('Error adding lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="lead-form" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>✨ New Lead</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                placeholder="e.g., John Doe"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                name="phone"
                placeholder="+91 1234567890"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email (Optional)</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Car Model</label>
              <input
                name="car_model"
                placeholder="e.g., Toyota Innova"
                value={form.car_model}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Budget (INR)</label>
              <input
                name="budget"
                type="number"
                placeholder="500000"
                value={form.budget}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Lead Source</label>
              <select name="source" value={form.source} onChange={handleChange}>
                <option>Walk-in</option>
                <option>Call</option>
                <option>WhatsApp</option>
                <option>Website</option>
                <option>Referral</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : '➕ Add Lead'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;