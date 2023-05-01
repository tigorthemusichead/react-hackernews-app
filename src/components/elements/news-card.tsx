import {Box, Chip, Paper, Typography, useTheme} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";

interface NewsCardProps {
    title: string,
    score: number,
    author: string,
    date: number,
    comments: number,
    id: number
}

const NewsCard = (props: NewsCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate()
    return (
        <Paper
            onClick={() => {
                navigate(`news/${props.id}`)
            }}
            sx={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                cursor: "pointer"
            }}
        >
            <Box sx={{display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center"}}>
                <Box sx={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <NewspaperIcon/>
                    <Typography variant={"subtitle1"}>{props.title}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <Typography variant={"caption"}>Rating</Typography>
                    <Chip label={`${props.score}`}/>
                </Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", marginLeft: "10px"}}>
                <Typography variant={"subtitle1"} sx={{ display: "flex", gap: "5px", alignItems: "center"}}>
                    By <Typography color={theme.palette.primary.light} variant={"subtitle1"}>{props.author}</Typography>
                </Typography>
                <Chip label={moment(props.date * 1000).format("HH:mm | DD MMM YYYY")}/>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: "5px"}}>
                <Chip color={"primary"} label={props.comments}></Chip>
                <Typography variant={"subtitle2"}>Comments</Typography>
            </Box>
        </Paper>
    )
}

export default NewsCard;