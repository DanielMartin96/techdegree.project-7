import React from "react";
import Photo from "./Photo";

const PhotoContainer = (props) => {
  const results = props.pics;
  let photos;
  if (results.length) {
    photos = results.map((photo, index) => (
      <Photo
        serverId={photo.server}
        id={photo.id}
        secret={photo.secret}
        title={photo.title}
        key={index}
      />
    ));
  }
  return (
    <div className="photo-container">
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoContainer;
