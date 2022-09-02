import styles from "../styles/formError.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const FormError = ({ error }) => {
  return (
    <div className={styles.caja}>
      <FontAwesomeIcon icon={faTriangleExclamation} className={styles.icon} />
      <p className={`${styles.message}`}>{error.message}</p>
    </div>
  );
};

export default FormError;
