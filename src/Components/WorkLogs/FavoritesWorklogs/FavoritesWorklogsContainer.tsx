import React from "react";
import FWS from "./FavoritesWorklogs.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {GlobalState} from "../../../Data/redux-store";

export type FavoritesWorklogsCoContainerOwnProps = {

}

export type MSTP_FavoritesWorklogsCoContainer = {

}

export type MDTP_FavoritesWorklogsCoContainer ={

}

export type TFavoritesWorklogsCoContainerProps = FavoritesWorklogsCoContainerOwnProps
    & MSTP_FavoritesWorklogsCoContainer
    & MDTP_FavoritesWorklogsCoContainer

class FavoritesWorklogsCoContainer  extends React.Component<TFavoritesWorklogsCoContainerProps> {

    render(){
        return(<div>

        </div>)
    }

}

const StateToProps = (state : GlobalState)  : MSTP_FavoritesWorklogsCoContainer =>({

    })

export default compose(connect<MSTP_FavoritesWorklogsCoContainer, MDTP_FavoritesWorklogsCoContainer,
    FavoritesWorklogsCoContainerOwnProps, GlobalState>
(StateToProps, {}  ))(FavoritesWorklogsCoContainer)