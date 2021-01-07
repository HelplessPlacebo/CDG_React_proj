import React from "react";
import {NavLink} from "react-router-dom";
import HS from "./NavBar.module.css"
import settings from "../../assets/imgs/settings.svg"
import FAQ from "../../assets/imgs/second_icon.svg"
import LogOutIcon from "../../assets/imgs/door.svg"
import AvatarIcon from "../../assets/imgs/avatar.svg"


export type TNavBarProps = {}

const NavBar: React.FC<TNavBarProps> = (props) => {
    return (<div className={HS.navContainer}>
        <div className={HS.navLinksContainer}>
            <div className={HS.NavLinksPosition}>
                <div className={HS.NavLinks}>
                    <div className={HS.item}>
                        <NavLink to="/Home/All">
                            Home
                        </NavLink>
                    </div>
                    <div className={HS.item}>
                        <NavLink to="/Issues/">
                            Issues
                        </NavLink>
                    </div>
                  {/*  <div className={HS.item}>
                        <NavLink to="/Filters/">
                            Filters
                        </NavLink>
                    </div>
                    <div className={HS.item}>
                        <NavLink to="/Projects/">
                            Projects
                        </NavLink>
                    </div>*/}
                </div>
            </div>
        </div>

        <div className={HS.NavIconsContainer}>
            <div className={HS.NavIcons}>
                <div className={HS.SmallIcons}>
                    <img src={settings} alt="settings"/>
                </div>
             {/*   <div className={HS.SmallIcons}>
                    <img src={FAQ} alt="info"/>
                </div>*/}
                <div className={HS.SmallIcons}>
                    <img src={LogOutIcon} alt="door1"/>
                </div>
                <div className={HS.AvatarIcons}>
                    <img className="" src={AvatarIcon} alt="avatar_icon"/>
                </div>
            </div>
        </div>
    </div>)

}


export default NavBar