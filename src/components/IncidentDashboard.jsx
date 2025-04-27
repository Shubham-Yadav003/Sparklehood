import { useContext, useState } from 'react';
import { IncidentContext } from '../context/IncidentContext';
import './IncidentDashboard.css';

const IncidentDashboard = () => {
  const {
    incidents,
    severityFilter,
    setSeverityFilter,
    sortOrder,
    setSortOrder,
    expandedIncidents,
    toggleIncident,
    addIncident
  } = useContext(IncidentContext);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Low'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    addIncident(formData);
    setFormData({ title: '', description: '', severity: 'Low' });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard">
      <h1>AI Safety Incident Dashboard</h1>
      
      <div className="controls">
        <div className="filter-controls">
          <label>Filter by Severity:</label>
          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="sort-controls">
          <label>Sort by Date:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <button 
          className="new-incident-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Report New Incident'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="incident-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Incident Title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Incident Description"
            required
          />
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Submit Incident</button>
        </form>
      )}

      <div className="incidents-list">
        {incidents.map(incident => (
          <div 
            key={incident.id} 
            className={`incident-card ${incident.severity.toLowerCase()}`}
          >
            <div className="incident-header">
              <h3>{incident.title}</h3>
              <div className="incident-meta">
                <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
                <span className="date">
                  {new Date(incident.reported_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button 
              className="view-details-btn"
              onClick={() => toggleIncident(incident.id)}
            >
              {expandedIncidents.has(incident.id) ? 'Hide Details' : 'View Details'}
            </button>
            {expandedIncidents.has(incident.id) && (
              <p className="incident-description">{incident.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentDashboard; 