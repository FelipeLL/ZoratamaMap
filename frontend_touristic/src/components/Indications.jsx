import styles from "../styles/indications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleXmark,
  faPersonWalking,
  faCarRear,
  faPersonBiking,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Indications = () => {
  const [active, setActive] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const {
    sliderIndications,
    setSliderIndications,
    setDirections,
    directions,
    setProfile,
  } = useContext(UserContext);
  const handleActive = (index, profile) => {
    setActive(index);
    setProfile(profile);
  };

  return (
    <div
      className={
        sliderIndications
          ? collapse
            ? `${styles.sidebar} ${styles["middle-collapse"]}`
            : `${styles.sidebar}`
          : `${styles.sidebar} ${styles.collapse}`
      }
    >
      <div className={`${styles["sidebar-content"]}`}>
        <div onClick={() => setCollapse(!collapse)}>
          <FontAwesomeIcon icon={faCircleLeft} className={styles.back} />
        </div>
        <div
          onClick={() => {
            setSliderIndications(false);
            setDirections({});
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} className={styles.close} />
        </div>
        <div className={styles.title}>
          <p>Indicaciones</p>
        </div>
        <div className={styles.routes}>
          <div>
            <p>Perfiles de ruta</p>
          </div>
          <div>
            <ul className={styles.profiles}>
              <li
                className={active === 1 ? `${styles.active}` : ""}
                onClick={() => handleActive(1, "driving")}
              >
                <FontAwesomeIcon
                  icon={faCarRear}
                  className={`${styles.icon} `}
                />
                Driving
              </li>
              <li
                className={active === 2 ? `${styles.active} ` : ""}
                onClick={() => handleActive(2, "walking")}
              >
                <FontAwesomeIcon
                  icon={faPersonWalking}
                  className={styles.icon}
                />
                Walking
              </li>
              <li
                className={active === 3 ? `${styles.active} ` : ""}
                onClick={() => handleActive(3, "cycling")}
              >
                <FontAwesomeIcon
                  icon={faPersonBiking}
                  className={styles.icon}
                />
                Cycling
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.information}>
          <p>
            <span>Distancia:</span>{" "}
            {directions.distance > 1000
              ? `${(directions.distance / 1000).toFixed(1)} KM`
              : `${Math.trunc(directions.distance)} Mts`}
          </p>
          <p>
            <span>Tiempo estimado:</span>{" "}
            {Math.trunc(directions.duration / 60) > 59
              ? `${(Math.trunc(directions.duration / 60) * 0.0166667).toFixed(
                  1
                )} Hora(s)`
              : `${Math.trunc(directions.duration / 60)} Minutos`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Indications;
