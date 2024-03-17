import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CategoryIcon from '@mui/icons-material/Category';
import { grey } from '@mui/material/colors';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      className={`drawer ${open ? "open" : ""}`}
      classes={{
        paper: `paper ${open ? "open" : ""}`
      }}
    >
      <i className="fa-solid fa-filter pt-8"></i>

      <div className={`content ${open ? "open" : ""}`}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <LocationOnIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Warehouse" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Receipt" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Order" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <SupervisorAccountIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Employee" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon style={{ color: grey[500] }} />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
