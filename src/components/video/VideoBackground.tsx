import {useEffect} from "react";
import "./index.css";

const VideoBackground = () => {
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);
    return (
        <div className="video-container">
            <video id="video" autoPlay muted loop controls>
                <source
                    src="https://storage.googleapis.com/mylenaejhonathan/pre-wedding.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default VideoBackground;
