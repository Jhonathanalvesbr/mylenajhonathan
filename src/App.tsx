import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ModalImport from "./components/modal";
import VideoBackground from "./components/video/VideoBackground";

function App() {
    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<VideoBackground/>}/>
                    <Route index element={<VideoBackground/>}/>
                    <Route path="/:id" element={<ModalImport/>}/>
                    <Route path="/pre-wedding/video" element={<VideoBackground/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
