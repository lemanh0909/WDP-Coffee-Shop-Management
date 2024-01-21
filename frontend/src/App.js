import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './pages/login/login.jsx';
import EmployeeManagement from './pages/ManagerStaff/managerStaff.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Sử dụng <Routes> thay vì <Route> */}
          <Route path="/" element={<Login />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
