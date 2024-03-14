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
import Navbar from './pages/Common/navbar.jsx';
import Thuchi from './pages/PhieuThuChi/PhieuThuChi.jsx';

import ExportImportNOte from './pages/ExportImportnote/exportimportnote.jsx';

import ViewOrder from './pages/ViewOrder/viewOrder.jsx';
import ViewOrderDetail from './pages/ViewOrder/viewOrderDetail.jsx';
import UploadImage from './pages/ImgUp/UploadImage.jsx';
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
          <Route path="/navbar" element={< Navbar />} />
          <Route path="/Thuchi" element={< Thuchi />} />

          <Route path="/exportimportnote" element={< ExportImportNOte />} />

          <Route path="/view-order" element={<ViewOrder/>}/>
<<<<<<< HEAD
          <Route path="{`/view-order/${order.id}`}" element={<ViewOrderDetail/>}/>
          <Route path="/upImg" element={<UploadImage/>}/>
=======
          <Route path="/view-order/detail" element={<ViewOrderDetail/>}/>


>>>>>>> 1b2986056825d589e96c8716449bdff42565021d
        </Routes>
      </div>
    </Router>
  );
}

export default App;
