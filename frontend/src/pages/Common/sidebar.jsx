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
import "../Common/sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <UserIcon className="icon-container" alt="company logo" style={{ fontSize: 60, color: 'white' }} />
      </div>
      <p className="user-container">User sidebar</p>
      <div className="flex flex-col">
        <List>
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
          <Divider />
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Warehouse" />
          </ListItem>
          <Divider />
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Receipt" />
          </ListItem>
          <Divider />
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Order" />
          </ListItem>
          <Divider />
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Employee" />
          </ListItem>
          <Divider />
          <ListItem button className="list-item" style={{ color: 'white' }}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
