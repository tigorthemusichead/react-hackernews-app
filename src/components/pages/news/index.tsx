import useSingleNews from "../../../hooks/use-single-news";
import {Link, useParams} from "react-router-dom";
import {Box, Button, Chip, CircularProgress, Divider, Paper, Skeleton, Typography, useTheme} from "@mui/material";
import moment from "moment";
import _ from "lodash";
import Comment from "../../elements/comment"
import RefreshIcon from "@mui/icons-material/Refresh";
import Skelet from "../../elements/skelet";



const News = () => {
    const { id } = useParams();
    const {news, fetch, loading } = useSingleNews(id);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Button startIcon={<RefreshIcon/>}
                        onClick={fetch}
                        disabled={loading}
                >
                    Reload
                </Button>
                { loading ?
                    <Chip icon={<Box sx={{paddingLeft: "5px"}}><CircularProgress size={10}/></Box>} label={"Loading..."}/> :
                    <></>
                }
            </Box>
            <Paper sx={{
                    minHeight: "calc(100vh - 300px)",
                    padding: "40px"
                }}
            >
                <Typography variant={"h3"}>
                    <Skelet loading={loading} value={news?.title}/>
                </Typography>
                <Typography variant={"h6"} color={"primary"} sx={{marginTop: "15px"}}>
                    <Skelet loading={loading} value={news?.by}/>
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px"
                }}>
                    <Chip label={
                        loading && news?.time === undefined ?
                            "" :
                            moment((news?.time || 1) * 1000).format("HH:mm | DD MMM YYYY")
                    }/>
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Typography variant={"caption"}>Rating</Typography>
                        <Chip label={<Skelet loading={loading} value={news?.score}/>}/>
                    </Box>
                </Box>
                <Box sx={{margin: "45px 0"}}>
                    <Link to={news?.url || ""} target={"_blank"}>
                        <Typography color={"primary"}>
                            <Skelet loading={loading} value={news?.url}/>
                        </Typography>
                    </Link>
                </Box>
                <Divider />
                <Typography variant={"h6"} sx={{margin: "45px 0 10px 0"}}>
                    Comments ({news?.descendants || 0})
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    {
                        _.map(news?.kids || [], (commentId) => <Comment id={commentId}/>)
                    }
                </Box>
            </Paper>
        </Box>
    )
}

export default News;