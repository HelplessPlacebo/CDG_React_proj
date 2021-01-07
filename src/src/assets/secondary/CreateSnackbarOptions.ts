import {TSnackBarOptions} from "../../Components/SnackBar/SnackBar";

const CreateSnackBarOptions =(severity : "error" | "info" | "warning" | "success",message : string)=>(
    {
        message,
        severity,
        position : {
            vertical : "bottom",
            horizontal : "right"
        }
    } as TSnackBarOptions
)
export default CreateSnackBarOptions