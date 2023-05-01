import axios from "axios";
import {API_URL} from "../constants";
import {useEffect, useState} from "react";
import {INews} from "./use-top-news";

interface IComment {
    by: string,
    text: string,
    time: number,
    kids: Array<number>,
    descendants: number,
    score: number,
    id: number
}

const useComment = (commentId: number | undefined) => {
    const [state, setState] = useState<IComment>()
    const fetchComment = async () => {
        const response = await axios.get(`${API_URL}/item/${commentId}.json`);
        const commentData = response.data;
        setState(commentData);
    }

    useEffect(() => {
        fetchComment()
        {/*const interval = setInterval(fetchComment, 60000);
        return () => clearInterval(interval);*/}
    }, [])

    return {
        comment: state,
        fetch: fetchComment
    }
}

export default useComment;