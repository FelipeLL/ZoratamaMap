import styles from "../styles/changeMaps.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrafficLight,
  faEarthAmericas,
  faLayerGroup,
  faSatelliteDish,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ChangeMaps = ({ setMapStyle }) => {
  const [open, setOpen] = useState(false);
  const handleMapStyle = (style) => {
    setMapStyle(style);
    setOpen(!open);
  };
  return (
    <nav>
      <div>
        <div
          className={
            open
              ? `${styles["toggle-btn"]} ${styles.open}`
              : styles["toggle-btn"]
          }
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faLayerGroup} />
        </div>
        <div
          className={
            open
              ? `${styles["nav-content"]} ${styles.open}`
              : styles["nav-content"]
          }
        >
          <span className={styles.options}>
            <FontAwesomeIcon
              icon={faEarthAmericas}
              className={styles.icon}
              onClick={() =>
                handleMapStyle("jfelipeladino/cl1yho734000414o5b4b0j9xe")
              }
            />
          </span>
          <span className={styles.options}>
            <FontAwesomeIcon
              icon={faSatelliteDish}
              className={styles.icon}
              onClick={() => handleMapStyle("mapbox/satellite-v9")}
            />
          </span>
          <span className={styles.options}>
            <FontAwesomeIcon
              icon={faTrafficLight}
              className={styles.icon}
              onClick={() => handleMapStyle("mapbox/dark-v10")}
            />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default ChangeMaps;
