import styles from "../styles/openButtons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const OpenConfig = ({ setSliderConfig }) => {
  return (
    <div>
      <span
        className={styles["rounded-boton"]}
        onClick={() => setSliderConfig(true)}
      >
        <FontAwesomeIcon icon={faGear} style={{ color: "#333" }} />
      </span>
    </div>
  );
};

export default OpenConfig;
