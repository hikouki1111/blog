import "./App.css"
import {ReactElement, useEffect, useState} from "react";

type ArticleProps = {
    articleID: string
};

const Article: React.FC<ArticleProps> = ({articleID}) => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/articles/${articleID}.json`);
            const json = await response.json();
            setTitle(json["title"]);
            setDate(json["date"]);
        };
        fetchData();
    }, [articleID]);

    if (title === "") {
        return null;
    }

    return(
        <div className="article" onClick={() => window.open(`article/${articleID}`, "_blank")}>
            <h1>{title}</h1>
            <p>{date}</p>
        </div>
    )
}

function Home() {
    const [articles, setArticles] = useState<ReactElement[]>([]);

    useEffect(() => {
        const articleList: ReactElement[] = [];
        const fetchData = async () => {
            const response = await fetch(`/articles/articles_data.json`);
            const json = await response.json();
            json["articles"].forEach((article: string) => {
                articleList.push(<Article articleID={article}/>);
            });
        }

        fetchData().then(() => {
            setArticles(articleList);
        });
    }, []);

    return (
        <>
            {articles}
        </>
    )
}

export default Home;