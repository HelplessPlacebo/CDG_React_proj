import {TShowSnackBar} from "../App";

export type TComponentToDraw = "Worklogs" | "FavoritesWorklogs"

export type TWorklogsContainerOwnProps={
    openWorklogChangeModal: () => void
    componentToDraw: TComponentToDraw
    showSnackBar: TShowSnackBar
    closeWorklogChangeModal: () => void
}

export type TworklogsType = "All" | "Favorites"
export type TWorklogsTypeControlButtons = {
    worklogsType : TworklogsType
}