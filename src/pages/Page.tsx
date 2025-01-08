import NotFound from "./NotFound.tsx";
import markdownit from "markdown-it";
import highlightMd from "markdown-it-highlightjs"
import {useEffect, useState} from "react";
import "highlight.js/styles/github.css";

const md = markdownit().use(highlightMd);

function Page() {
    const indexOfPage = window.location.pathname.split("/").filter(Boolean).pop();
    const isValidType = indexOfPage != undefined;
    const [article, setArticle] = useState("");

    useEffect(() => {
        if (isValidType) {
            const fetchData = async () => {
                const response = await fetch(`/articles/${indexOfPage}.json`);
                const json = await response.json();
                setArticle(json["md"]);
            }
            fetchData();
        }
    }, [indexOfPage, isValidType]);

    if (!isValidType)
        return <NotFound />;

    return(
        <>
            <div
                dangerouslySetInnerHTML={{ __html: md.render(article) }}
            />
        </>
    )
}

export default Page