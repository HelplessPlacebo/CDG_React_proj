const PUT_PROFILE = "Profile/PUT_PROFILE"

export type TProfileInfo = {
    firstName : string
    lastName : string
    avatarUrl : string | null
}
const defaultState = {
    profileInfo: {
        firstName: "test",
        lastName: "test",
        avatarUrl: "https://i2.wp.com/taratutenko.ru/wp-content/uploads/2018/11/Island_04.jpg?w=1280&ssl=1",
    }as TProfileInfo
}

type TActionsTypes = ReturnType<TPutProfileType>

export const profileReducer = (state = defaultState, action: TActionsTypes) => {
    switch (action.type) {
        case PUT_PROFILE : {
            return {
                ...state,
                profileInfo: action.payload
            }
        }
        default :
            return state
    }
}

export const putProfileAC = (profileInfo :TProfileInfo)=>({type : PUT_PROFILE,payload :profileInfo} as const)
export type TPutProfileType = typeof putProfileAC