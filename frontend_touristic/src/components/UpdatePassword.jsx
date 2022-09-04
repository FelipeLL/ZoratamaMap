import styles from "../styles/updatePassword.module.css";
import axios from "axios";
import { useState, useRef } from "react";
import { alertError, alertSuccess, alertWarning } from "../utilities/Alerts";
import { ToastContainer } from "react-toastify";
const UpdatePassword = ({ userData }) => {
  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const inputCurrent = useRef(null);
  const inputNew = useRef(null);
  const inputConfirm = useRef(null);

  const [passwords, setPasswords] = useState(initialState);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { currentPassword, newPassword, confirmPassword } = passwords;

      if (
        !currentPassword.trim() ||
        !newPassword.trim() ||
        !confirmPassword.trim()
      ) {
        return alertWarning("Complete todos los campos");
      }

      if (newPassword !== confirmPassword) {
        return alertWarning("Las contraseñas no coinciden");
      }

      const URI =
        "https://mapzoratama.herokuapp.com/api/users/password/" +
        userData[0].ID_Usuario;
      const res = await axios.put(URI, { currentPassword, newPassword });

      handleResetValues();
      setPasswords(initialState);
      alertSuccess(res.data.results.message);
    } catch (error) {
      alertError(error.response.data);
    }
  };

  const handleChange = (e) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetValues = () => {
    inputCurrent.current.value = "";
    inputNew.current.value = "";
    inputConfirm.current.value = "";
  };

  return (
    <>
      <h3 className={`text-center ${styles["title"]}`}>
        Actualizar contraseña
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-10">
            <label className={styles.text}>Contraseña actual</label>

            <div className={styles["input-box"]}>
              <input
                type="password"
                name="currentPassword"
                value={passwords.nombre}
                onChange={handleChange}
                ref={inputCurrent}
              />
            </div>
          </div>
          <div className="col-10">
            <label className={styles.text}>Nueva contraseña</label>

            <div className={styles["input-box"]}>
              <input
                type="password"
                name="newPassword"
                value={passwords.nombre}
                onChange={handleChange}
                ref={inputNew}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <label className={styles.text}>Confirmar contraseña</label>

            <div className={styles["input-box"]}>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.nombre}
                onChange={handleChange}
                ref={inputConfirm}
              />
            </div>
          </div>
        </div>

        <span className={styles["button-box"]}>
          <button type="submit">Actualizar</button>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};

export default UpdatePassword;
