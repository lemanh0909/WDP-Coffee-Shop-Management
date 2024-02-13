import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './pages/login/login.jsx';
import EmployeeManagement from './pages/ManagerStaff/managerStaff.jsx';
import Warehouse from './pages/WarehouseManage/warehouse.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/warehouse" element={<Warehouse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
