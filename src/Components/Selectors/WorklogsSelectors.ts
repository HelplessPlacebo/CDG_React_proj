import {GlobalState} from "../../Redux/redux-store";

export const getPlayingWorklog = (state : GlobalState) => state.WorklogsData.PlayingWorklog
export const getWorklogsBlocks = (state : GlobalState) => state.WorklogsData.WorkLogsBlocks
export const getFavoritesWorklog = (state : GlobalState) => state.WorklogsData.FavoritesWorklogs
export const getWorklogToChange = (state : GlobalState) => state.WorklogsData.WorklogToChange
