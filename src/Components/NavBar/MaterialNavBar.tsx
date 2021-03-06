import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import HS from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from '@material-ui/core/Avatar';
import EmptyAvatar from "../../assets/imgs/EmptyAvatar.jpg"

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
type TMaterialNavProps = {
    openUserProfile : ()=> void
    onUnAuth : ()=>void
    profileAvatarUrl : string | null
}
 const MaterialNav : React.FC<TMaterialNavProps> = (props) =>{
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget)
    const LogOut = ()=>{
        localStorage.setItem("IsAuth","false")
        props.onUnAuth()
    }

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
                <IconButton color="primary">
                    <SettingsIcon/>
                </IconButton>

                Settings
            </MenuItem>
            <MenuItem>
                <IconButton onClick={LogOut} color="primary">
                    <ExitToAppIcon/>
                </IconButton>
                Logout
            </MenuItem>
            <MenuItem     onClick={props.openUserProfile} >
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="primary"
                >
                    <Avatar alt={"user avatar"} src={props.profileAvatarUrl ? props.profileAvatarUrl : EmptyAvatar}/>
                </IconButton>
                Profile
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.grow}>
            <AppBar position="sticky">
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
                            <IconButton disableFocusRipple  color="inherit">
                                <SettingsIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Logout" arrow placement="bottom">
                            <IconButton disableFocusRipple onClick={LogOut} color="inherit">
                                <ExitToAppIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Profile" arrow placement="bottom">
                            <IconButton disableFocusRipple
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={props.openUserProfile}
                            >
                                <Avatar alt={"user avatar"} src={props.profileAvatarUrl ? props.profileAvatarUrl : EmptyAvatar}/>
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
        </div>
    );
}
export default  React.memo(MaterialNav,(prevProps,nextProps)=>{
    if(prevProps.profileAvatarUrl !== nextProps.profileAvatarUrl) return false
    else return true
})