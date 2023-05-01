import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../constants";

export interface INews {
    by: string,
    score: number,
    time: number,
    title: string,
    kids: Array<number | any>,
    descendants: number,
    url: string,
    id: number
}


const useTopNews = () => {
    const [state, setState] = useState<INews[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchNews = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/newstories.json`);
            const stories = await response.data;
            const topStories = stories.slice(0, 100);

            const storyFetchers = topStories.map((storyId: number) => new Promise(async (resolve, reject) => {
                    const response = await axios.get(`${API_URL}/item/${storyId}.json`)
                    const data = await response.data;
                    resolve(data);
                })
            );

            const news = await Promise.all(storyFetchers);
            setState(news);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNews()
        const interval = setInterval(fetchNews, 60000);
        return () => clearInterval(interval);
    }, []);

    return {
        news: state,
        loading,
        fetch: fetchNews
    }
};

export default useTopNews;