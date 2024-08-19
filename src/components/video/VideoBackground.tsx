
import "./index.css";
const VideoBackground = () => {
  return (
    <div className="video-container">
      <video id="video" autoPlay muted loop controls>
        <source src="https://storage.cloud.google.com/mylenaejhonathan/PRE_WEDDING_V4.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
