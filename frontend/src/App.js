import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './pages/login/login.jsx';
import EmployeeManagement from './pages/ManagerStaff/managerStaff.jsx';
import Warehouse from './pages/WarehouseManage/warehouse.jsx';
import ProductManage from './pages/ProductManage/productmanage.jsx';
import Order from './pages/Order/Order.jsx';
import Category from './pages/Category/Category.jsx';
import AddCategory from './pages/Category/addCategory.jsx';
import Control from './pages/Control/Control.jsx';
import Thuchi from './pages/PhieuThuChi/PhieuThuChi.jsx';

import AdminManagement from './pages/ManagerStaff/manageAdmin.jsx';
import AuthenPage from './pages/authService/AuthenPage.jsx';

import MiniDrawer from "./pages/Common/Dashboard.jsx"
import MiniDrawerAdmin from './pages/Common/DashboardAdmin.jsx';
import ExportImportNOte from './pages/ExportImportnote/exportimportnote.jsx';

import ViewOrder from './pages/ViewOrder/viewOrder.jsx';
import ViewOrderDetail from './pages/ViewOrder/viewOrderDetail.jsx';
import UploadImage from './pages/ImgUp/UploadImage.jsx';
import UserProfilenew from './pages/UserProfile/UserProfilenew.jsx';
import Statistic from './pages/Statistic/Statistic.jsx';

function App() {

  const [latestFullName, setLatestFullName] = useState('');

  const updateLatestFullName = (newFullName) => {
    setLatestFullName(newFullName);
  };

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
          <Route path="/addcategory" element={< AddCategory />} />
          <Route path="/Thuchi" element={< Thuchi />} />
          <Route path="/AdminManagement" element={<AdminManagement />} />
          <Route path="/exportimportnote" element={< ExportImportNOte />} />
          <Route path="/view-order" element={<ViewOrder />} />
          <Route path="{`/view-order/${order.id}`}" element={<ViewOrderDetail />} />
          <Route path="/upImg" element={<UploadImage />} />
          <Route path="/profilenew" element={<UserProfilenew updateLatestFullName={updateLatestFullName} />} />
          <Route path='/verify/:id/:uniqueString' element={<AuthenPage></AuthenPage>}></Route>
          <Route path="/miniDrawer" element={<MiniDrawer />} />
          <Route path="/miniDrawerAdmin" element={<MiniDrawerAdmin />} />
          <Route path="/statistic" element={<Statistic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
