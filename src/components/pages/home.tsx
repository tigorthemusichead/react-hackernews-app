import _ from "lodash"
import useTopNews from "../../hooks/use-top-news";
import NewsCard from "../elements/news-card";
import {Box, Button, Chip, CircularProgress, Skeleton} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import shortid from "shortid"

const Home = () => {
    const { news, loading, fetch } = useTopNews();
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
                    { news.length > 0 ?
                        _.map(news, ({by, score, time, title, kids, descendants, id}) => (
                            <NewsCard
                                key={shortid.generate()}
                                author={by}
                                score={score}
                                date={time}
                                title={title}
                                comments={descendants}
                                id={id}
                            />
                        )) :
                        <>
                        {
                            _.map([0, 1, 2, 3, 4, 5], () => (
                                <Skeleton key={shortid.generate()}
                                          variant={"rectangular"}
                                          sx={{
                                                height: "140px",
                                                borderRadius: "3px",
                                }}/>
                            ))
                        }
                        </>
                    }
                </Box>
    )
}

export default Home;