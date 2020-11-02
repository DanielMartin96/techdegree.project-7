import React from "react";

const Photo = (props) => (
  <li>
    <img
      alt={props.title}
      src={`https://live.staticflickr.com/${props.serverId}/${props.id}_${props.secret}.jpg`}
    />
  </li>
);

export default Photo;
