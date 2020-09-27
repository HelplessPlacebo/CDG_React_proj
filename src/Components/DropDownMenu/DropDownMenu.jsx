import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreHoriz';
import DDMS from "./DropDownMenu.module.css"

const options = [
    'Jira link',
    'Duplicate',
    'Add to favorite',
    'Delete',
];

export default function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={DDMS.dropDownMenu}>

            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="false"

                onClick={handleClick}

            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        marginRight : '200px',
                        marginTop : '55px',
                        maxHeight: '300px',
                        backgroundColor : "#FFFFFF",
                        borderRadius : '10px',
                        width: '192px',
                        outlined : "none",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem style={{paddingLeft : "32px" , paddingTop: "8px", marginBottom : "10px", fontFamily : "Roboto",
                        fontStyle : "normal", fontWeight : "normal", fontSize : "16px", lineHeight : "144%",
                             color : "#4F4F4F"}}
                              key={option}
                              onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}