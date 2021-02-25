import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {UserProfileReduxForm} from "./UserProfileForm";
import {deletePhotoAC, putProfileAC, TProfileInfo} from "../../Redux/ProfileReducer";
import {TImgValue} from "../CustomElements/CustomInputs/ImgInput";
import {useDispatch} from "react-redux";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type TModalUserProfile = {
    isOpen: boolean
    hide: () => void
    profileInfo: TProfileInfo
}

const ModalUserProfile: React.FC<TModalUserProfile> = (props) => {
    const [tempImg, setTempImg] = useState<TImgValue>({file: null, url: props.profileInfo.avatarUrl})
    const dispatch = useDispatch()

    const SaveProfileData = (formData: TProfileInfo) => {
            dispatch(putProfileAC({...formData, avatarUrl : tempImg.url}))
            props.hide()
    }
    const onDeleteClick=()=>{
        dispatch(deletePhotoAC())
        setTempImg({file : null,url : null})
    }

    return <Dialog open={props.isOpen} TransitionComponent={Transition} keepMounted
                   onClose={props.hide}
                   aria-labelledby="alert-dialog-slide-title"
                   aria-describedby="alert-dialog-slide-description">

        <DialogTitle id="alert-dialog-slide-title">{"Profile"}</DialogTitle>
        <DialogContent>
            <UserProfileReduxForm
                value={tempImg}
                setValue={setTempImg}
                onDeleteClick={onDeleteClick}
                initialValues={props.profileInfo}
                onSubmit={SaveProfileData} profileInfo={props.profileInfo} onClose={props.hide}/>
        </DialogContent>
    </Dialog>
}

export default React.memo(ModalUserProfile, (prevProps, nextProps) => {
    if (nextProps.isOpen !== prevProps.isOpen) return false
    else return true
})