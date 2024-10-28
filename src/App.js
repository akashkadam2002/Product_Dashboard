import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/graphs" element={<GraphPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
