import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import HS from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            marginLeft: "5%",
            color: "#FFFFFF",
            cursor: "pointer"
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

export default React.memo(function MaterialNav(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const LogOut = ()=>{
        localStorage.setItem("IsAuth","false")
        window.location.reload()
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <SettingsIcon/>
                </IconButton>

                Settings
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit">
                    <InfoIcon/>
                </IconButton>
                Info
            </MenuItem>
            <MenuItem>
                <IconButton onClick={LogOut} color="inherit">
                    <ExitToAppIcon/>
                </IconButton>
                Logout
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                Profile
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <div className={HS.NavLinks}>
                        <div className={HS.item}>
                            <NavLink to="/Home/All">
                                Worklogs
                            </NavLink>
                        </div>

                        <div className={HS.item}>
                            <NavLink to="/Issues/">
                                Issues
                            </NavLink>
                        </div>

                    </div>


                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <Tooltip title="Settings" arrow placement="bottom">
                            <IconButton color="inherit">
                                <SettingsIcon/>
                            </IconButton>
                        </Tooltip>

                            <Tooltip title="Info" arrow placement="bottom">
                                <IconButton color="inherit">
                                    <InfoIcon/>
                                </IconButton>
                            </Tooltip>

                        <Tooltip title="Logout" arrow placement="bottom">
                            <IconButton onClick={LogOut} color="inherit">
                                <ExitToAppIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Profile" arrow placement="bottom">
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
})