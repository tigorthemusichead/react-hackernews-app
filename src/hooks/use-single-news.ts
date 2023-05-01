import axios from "axios";
import {API_URL} from "../constants";
import {useEffect, useState} from "react";
import {INews} from "./use-top-news";

const useSingleNews = (newsId: string | undefined) => {
    const [state, setState] = useState<INews>()
    const [loading, setLoading] = useState(false);
    const fetchNews = async () => {
        setLoading(true);
        const response = await axios.get(`${API_URL}/item/${newsId}.json`);
        const newsData = response.data;
        setState(newsData);
        setLoading(false);
    }

    useEffect(() => {
        fetchNews()
        const interval = setInterval(fetchNews, 60000);
        return () => clearInterval(interval);
    }, [])

    return {
        news: state,
        fetch: fetchNews,
        loading
    }
}

export default useSingleNews;