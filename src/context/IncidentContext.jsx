import { createContext, useState } from 'react';

export const IncidentContext = createContext();

const mockIncidents = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedIncidents, setExpandedIncidents] = useState(new Set());

  const addIncident = (newIncident) => {
    setIncidents(prev => [...prev, {
      ...newIncident,
      id: Date.now(),
      reported_at: new Date().toISOString()
    }]);
  };

  const toggleIncident = (id) => {
    setExpandedIncidents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => severityFilter === 'All' || incident.severity === severityFilter)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <IncidentContext.Provider value={{
      incidents: filteredAndSortedIncidents,
      severityFilter,
      setSeverityFilter,
      sortOrder,
      setSortOrder,
      expandedIncidents,
      toggleIncident,
      addIncident
    }}>
      {children}
    </IncidentContext.Provider>
  );
}; 