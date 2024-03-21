import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import logoImage from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";

const CommonNavbar = ({ latestFullName }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const isMobile = window.innerWidth <= 768;

    useEffect(() => {
        const handleResize = () => {
            setAnchorEl(null);
            setAnchorElUser(null);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleUserMenuClick = (event) => {
        setAnchorElUser(event.currentTarget);
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

    return (

        <AppBar position="static">
            <Toolbar className="toolbar">
                <Link to="/control">
                    <Typography variant="h6" component="div">
                        <img src={logoImage} alt="Logo" className="logo" />
                    </Typography>
                </Link>

                <Box className="menu-container">
                    {isMobile ? (
                        <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                aria-haspopup="true"
                                endIcon={<ExpandMoreIcon />}
                                onClick={handleMenuClick}
                                className="menu-button"
                            >
                                <DescriptionIcon />
                                Docs
                            </Button>
                            <Button color="inherit" href="https://github.com/lemanh0909/WDP-Coffee-Shop-Management.git" target="_blank" className="menu-button">
                                <GitHubIcon />
                                Github
                            </Button>
                            <Button color="inherit" href="https://trello.com/b/4vx9Loyf/se1634nj-wdp301-team-2" target="_blank" className="menu-button">
                                <AssignmentIcon />
                                Trello
                            </Button>
                        </>

                    )}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        className="menu"
                    >
                        <MenuItem href="https://docs.google.com/document/d/1eeJoJAiYRPSNyCzV7gPlePC2p42alIuf/edit" target="_blank" onClick={handleCloseMenu}>
                            <DescriptionIcon />
                            RDS
                        </MenuItem>
                        <MenuItem href="https://docs.google.com/spreadsheets/d/1TAM8cVZHsPfbkoyXb7Mld_NW3vd1Sj40/edit#gid=106360820" target="_blank" onClick={handleCloseMenu}>
                            <GitHubIcon />
                            PrT
                        </MenuItem>
                        <MenuItem href="https://docs.google.com/document/d/1tA73pdIg2yiiBHu4nmPeuB8xCefPYX6I/edit" target="_blank" onClick={handleCloseMenu}>
                            <AssignmentIcon />
                            FRD
                        </MenuItem>
                    </Menu>
                </Box>

                <Box>
                    <IconButton
                        color="inherit"
                        onClick={handleUserMenuClick}
                        className="navbar-user-button"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <AccountCircleIcon style={{ fontSize: 24 }} />
                        <span style={{ fontSize: 16, marginLeft: 8 }}>

                            <span style={{ fontSize: 16, marginLeft: 8 }}>{latestFullName || 'Hello'}</span>

                        </span>
                    </IconButton>

                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        className="user-menu"
                    >
                        <MenuItem onClick={navigateToProfile}>My Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default CommonNavbar;
