const PUT_PROFILE = "Profile/PUT_PROFILE"
const DELETE_USER_IMG = "Profile/DELETE_USER_IMG"

export type TProfileInfo = {
    firstName : string
    lastName : string
    avatarUrl : string | null
}
const defaultState = {
    profileInfo: {
        firstName: "test",
        lastName: "test",
        avatarUrl: "https://sun9-12.userapi.com/impg/crODjvO3q_mcNqO_hXB4KxXydi2bA9PdvKV7uA/U8xDGqrQEgg.jpg?size=521x521&quality=96&proxy=1&sign=b8db0fc53ff49fb22ce25a281c7fe77a&type=album",
    }as TProfileInfo
}

type TActionsTypes = ReturnType<TPutProfileType> | ReturnType<TdeletePhotoAC>

export const profileReducer = (state = defaultState, action: TActionsTypes) => {
    switch (action.type) {
        case PUT_PROFILE : {
            return {
                ...state,
                profileInfo: action.payload
            }
        }
        case DELETE_USER_IMG : {
            return  {
                ...state,
                profileInfo: {...state.profileInfo,avatarUrl : null}
            }
        }
        default :
            return state
    }
}

export const putProfileAC = (profileInfo :TProfileInfo)=>({type : PUT_PROFILE,payload :profileInfo} as const)
export const deletePhotoAC = ()=>({type : DELETE_USER_IMG } as const )
export type TdeletePhotoAC = typeof deletePhotoAC
export type TPutProfileType = typeof putProfileAC