import {Skeleton} from "@mui/material";
import {ReactNode} from "react";
interface SkeletProps {
    loading: boolean,
    value: string | ReactNode | undefined
}
const Skelet = ({loading, value}: SkeletProps) => {
    return (loading && value === undefined ? <Skeleton variant={"text"}/> : <>{value}</> )
}

export default Skelet;