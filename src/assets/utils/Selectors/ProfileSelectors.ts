import {GlobalState} from "../../../Redux/redux-store";

export const getProfileInfo = (state : GlobalState) => state.ProfileData.profileInfo
