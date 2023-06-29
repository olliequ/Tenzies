import React from "react";

export default function Stopwatch (props) {

    const minutes = ("0" + Math.floor((props.time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((props.time / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + ((props.time / 10) % 100)).slice(-2);

    return (
        <div>
            <p>⏲ Time elapsed:</p>
            {/* <span>{minutes}:{seconds}:{milliseconds}</span> */}
        </div>
    );
  };