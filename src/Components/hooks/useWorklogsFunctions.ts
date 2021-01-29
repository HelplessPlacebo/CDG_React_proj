import {useDispatch} from "react-redux";
import {
    AddWorklogAC, ChangeFavoritesWorklogAC,SetWorklogStatusAC,
    ChangeWorklogAC,AddToFavoriteAC,
    SetIsPlayingWorklogByIdAC,
    SetWorklogToChangeAC,DeleteFromFavoritesAC,DeleteWorklogAC,
    TWorkLog
} from "../../Redux/WorkLogsReducer";

export const useWorklogsFunctions = ()=>{
    const dispatch =  useDispatch()

     const addWorklog = (NewWorklog ?: TWorkLog, IsFavorites?: boolean) => dispatch(AddWorklogAC(NewWorklog, IsFavorites))

     const deleteWorklog = (DelWorklogId: number, DelParentId: number | null = null) =>
        dispatch(DeleteWorklogAC(DelWorklogId,DelParentId))

     const setIsPlayingWorklogById = (IsPlaying: boolean, ElementId?: number, IsFavorites ?: boolean) =>
        dispatch(SetIsPlayingWorklogByIdAC(IsPlaying, ElementId, IsFavorites))

     const setWorklogToChange = (WorklogToChange: TWorkLog | undefined = undefined) =>
        dispatch(SetWorklogToChangeAC(WorklogToChange))

     const changeWorklog = (NewWorklog: TWorkLog) => dispatch(ChangeWorklogAC(NewWorklog))

     const changeFavoritesWorklog = (WorklogId: number, NewWorklog: TWorkLog) =>
        dispatch(ChangeFavoritesWorklogAC(WorklogId, NewWorklog))

     const addToFavorite = (WorklogId: number) => dispatch(AddToFavoriteAC(WorklogId))

     const setWorklogStatus = (options: {
        target: "worklog" | "worklogblock",
        id: number,
        status: "ok" | "danger" | "warning"
    }) => dispatch(SetWorklogStatusAC(options))

     const deleteFromFavorites= (WorklogId: number)=> dispatch(DeleteFromFavoritesAC(WorklogId))

    return {
        addWorklog,deleteWorklog,setIsPlayingWorklogById,setWorklogToChange,changeWorklog,changeFavoritesWorklog,
        addToFavorite,setWorklogStatus,deleteFromFavorites
    }
}
