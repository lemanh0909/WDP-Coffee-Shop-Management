import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './pages/login/login.jsx';
import EmployeeManagement from './pages/ManagerStaff/managerStaff.jsx';
import Warehouse from './pages/WarehouseManage/warehouse.jsx';
import ProductManage from './pages/ProductManage/productmanage.jsx';
import Order from './pages/Order/Order.jsx';
import Category from './pages/Category/Category.jsx';
import Control from './pages/Control/Control.jsx';
import Sidebar from './pages/Common/sidebar.jsx';
import Thuchi from './pages/PhieuThuChi/PhieuThuChi.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/productmanage" element={< ProductManage />} />
          <Route path="/order" element={< Order />} />
          <Route path="/control" element={< Control />} />
          <Route path="/category" element={< Category />} />
          <Route path="/Sidebar" element={< Sidebar />} />
          <Route path="/Thuchi" element={< Thuchi />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
