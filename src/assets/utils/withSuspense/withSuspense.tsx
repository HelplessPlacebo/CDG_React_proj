import React, {Suspense} from "react"
import Progress from "../../../Components/Progress/Progress";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<Progress/>}>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}

