import styles from "../styles/openButtons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const OpenProfile = ({ setSliderProfile }) => {
  return (
    <div>
      <span
        className={styles["rounded-boton"]}
        onClick={() => setSliderProfile(true)}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: "#333" }} />
      </span>
    </div>
  );
};

export default OpenProfile;
