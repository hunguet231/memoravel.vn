import React from "react";
import YouTube from "react-youtube";
import styles from "../styles/Youtube.module.css";

const Youtube = () => {
  const opts = {
    // height: "100%",
    // width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={styles.container}>
      <YouTube videoId="Ly9w_dh3gkA" opts={opts} className={styles.youtube} />
    </div>
  );
};

export default Youtube;
