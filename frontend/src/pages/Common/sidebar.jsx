import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import UserIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from "react-router-dom";
import "../Common/sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <UserIcon className="icon-container" alt="company logo" style={{ fontSize: 60, color: 'white' }} />
      </div>
      <p className="user-container">{localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).fullName : 'Hello'}</p>
      <div className="flex flex-col">
        <List>
          <Link to="/control" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/productmanage" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/warehouse" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Warehouse" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/exportimportnote" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Receipt" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/order" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Order" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/employee-management" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Employee" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/category" className="list-item" style={{ color: 'white', textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
