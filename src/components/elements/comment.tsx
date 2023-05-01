import useComment from "../../hooks/use-comment";
import {Box, Chip, Paper, Typography, useTheme} from "@mui/material";
import { useState } from "react";
import _ from "lodash";
import moment from "moment";

interface CommentProps {
    id: number
}

const Comment = ({id}: CommentProps) => {
    const { comment, fetch } = useComment(id);
    const theme = useTheme();
    const [kidsOpen, setKidsOpen] = useState(false);

    return ( comment?.by !== undefined ?
        <Box sx={{
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <Paper
                sx={{
                    width: "100%",
                    //maxWidth: "400px",
                    padding: "10px",
                    background: theme.palette.grey["200"],
                    overflow: "hidden",
                    cursor: "pointer"
                }}
                onClick={()=>{
                    setKidsOpen(!kidsOpen)
                }}
            >
                <Typography variant={"caption"} color={"primary"}>
                    {comment?.by}
                </Typography>
                <Typography
                    variant={"inherit"}
                    dangerouslySetInnerHTML={{__html: comment?.text || ""}}
                />

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px"
                    }}>
                        <Chip
                            size={"small"}
                            variant={"outlined"}
                            color={"default"}
                            label={moment(comment.time * 1000).format("HH:mm | DD MMM YYYY")}
                        />
                        { (comment?.kids || []).length > 0 ?
                            <Typography
                                variant={"caption"}
                                color={"primary"}
                                sx={{ cursor: "pointer", userSelect: "none"}}
                            >
                                {
                                    kidsOpen ?
                                        "Close answers" :
                                        `Open answers (${( comment?.kids || []).length })`
                                }
                            </Typography> : <></>
                        }
                    </Box>
            </Paper>
            { kidsOpen && (comment?.kids || []).length > 0 ?
                <Box sx={{
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    borderLeft: `3px solid ${theme.palette.primary.light}`
                }}>
                    {
                        _.map(_.sortedUniq((comment?.kids || [])), (commentId) => <Comment id={commentId}/>)
                    }
                </Box> : <></>
            }
        </Box> : <></>
    )
}

export default Comment;