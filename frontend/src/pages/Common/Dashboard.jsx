import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Toolbar, Menu, MenuItem } from "@mui/material";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
    AccountCircle as AccountCircleIcon,
    Category as FolderIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Description as DescriptionIcon,
    Menu as MenuIcon,
    Person as PersonIcon,
    ReceiptLong as ReceiptLongIcon,
    ShoppingCart as ShoppingCartIcon,
    ShowChart as ShowChartIcon,
    Storage as StorageIcon,
    StoreMallDirectory as StoreMallDirectoryIcon,
} from '@mui/icons-material';

import PhieuThuChi from '../ExportImportnote/exportimportnote';
import Receipts from '../Receipt/PhieuThuChi.jsx';
import Warehouse from '../WarehouseManage/warehouse';
import ProductManage from '../ProductManage/productmanage';
import Order from '../Order/Order';
import ViewOrder from '../ViewOrder/viewOrder';
import Statistic from '../Statistic/Statistic';
import Category from '../Category/Category.jsx';
import Staff from "../ManagerStaff/managerStaff";
import useAuth from "../Common/Authorization.js";
import UserProfile from "../UserProfile/UserProfilenew.jsx"
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const [role] = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (role === "Manager" || role === "Staff") {
            navigate("/MiniDrawer");
        }
    }, [role, navigate]);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);


    useEffect(() => {
        const handleResize = () => {
            setAnchorEl(null);
            setAnchorElUser(null);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleUserMenuClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleProfileClick = () => {
        setSelectedComponent(<UserProfile />);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate("/");
    };

    const navigateToProfile = () => {
        navigate("/profileNew");
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedComponent, setSelectedComponent] = useState(<Warehouse />);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSidebarItemClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: '#8b5a2b' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Coffee Management
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', position: 'relative' }}>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            className="user-menu"
                        >
                            <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>

                        <IconButton
                            color="inherit"
                            onClick={handleUserMenuClick}
                            className="navbar-user-button"
                        >
                            <AccountCircleIcon style={{ fontSize: 24 }} />
                            <span style={{ fontSize: 16, marginLeft: 8 }}>
                                {localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).fullName : 'Hello'}
                            </span>
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: 'Category', icon: <FolderIcon />, component: <Category /> },
                        { text: 'Product', icon: <StoreMallDirectoryIcon />, component: <ProductManage /> },
                        { text: 'Warehouse', icon: <StorageIcon />, component: <Warehouse /> },
                        { text: 'Order', icon: <ShoppingCartIcon />, component: <Order /> },
                        { text: 'E-Import Note', icon: <DescriptionIcon />, component: <PhieuThuChi /> },
                        { text: 'Receipts Note', icon: <ReceiptLongIcon />, component: <Receipts /> },
                        { text: 'View Order', icon: <ShoppingCartIcon />, component: <ViewOrder /> },
                        { text: 'Statistic', icon: <ShowChartIcon />, component: <Statistic /> },
                        { text: 'Staff', icon: <PersonIcon />, component: <Staff /> },

                    ].map((item) => {
                        if ((item.text === 'Staff' || item.text === 'Statistic' || item.text === 'Category') && (role === 'Admin' || role === 'Staff')) {
                            return null;
                        }
                        return (
                            <ListItem key={item.text} disablePadding sx={{ display: 'block' }} onClick={() => handleSidebarItemClick(item.component)}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}

                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {selectedComponent}
            </Box>
        </Box>
    );
}
