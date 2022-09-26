import styles from "../styles/logout.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  const cerrar = async () => {
    const URI = "https://mapzoratama.herokuapp.com/api/auth/logout";
    await axios({
      method: "get",
      url: URI,
      withCredentials: true,
    });
  };

  return (
    <div>
      <a className={styles["rounded-boton"]} onClick={cerrar} href="/">
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          style={{ color: "#333" }}
        />
      </a>
    </div>
  );
};

export default Logout;
