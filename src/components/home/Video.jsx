import React from "react";
import heroVideo from "../../assets/video/homepage-bg-hero-video.mp4";

const Video = () => {
  return (
    <div className="h-full w-full">
      <video className="h-full w-full object-cover" autoPlay loop muted>
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
