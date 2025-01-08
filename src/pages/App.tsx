import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import Page from "./Page.tsx";
import NotFound from "./NotFound.tsx";
import Editor from "./Editor.tsx";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="article/*" element={<Page/>}/>
                <Route path="editor" element={<Editor/>}/>
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
