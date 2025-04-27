import { IncidentProvider } from './context/IncidentContext';
import IncidentDashboard from './components/IncidentDashboard';
import './App.css';

function App() {
  return (
    <IncidentProvider>
      <IncidentDashboard />
    </IncidentProvider>
  );
}

export default App;
