import "./Editor.css"
import "highlight.js/styles/github.css";
import markdownit from "markdown-it";
import highlightMd from "markdown-it-highlightjs"
import {SetStateAction, useState} from "react";

const md = markdownit().use(highlightMd);

function Editor() {
    const [preview, setPreview] = useState("");
    const onChangeEditor = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPreview(e.target.value);
    };

    const [title, setTitle] = useState("");
    const onChangeTitle = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTitle(e.target.value);
    };

    const onClickExport = () => {
        const data = {
            title: title,
            date: new Date().toDateString(),
            md: preview
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = title+".json";
        a.click();
        URL.revokeObjectURL(url);
    };

    return(
        <>
            <div className="panel">
                <textarea placeholder="Title" rows={1} cols={50} onChange={onChangeTitle}></textarea>
                <textarea placeholder="Article" rows={10} cols={50} onChange={onChangeEditor}></textarea>
                <button onClick={onClickExport}>Export</button>
            </div>
            <div dangerouslySetInnerHTML={{__html: md.render(preview)}}/>
        </>
    )
}

export default Editor;