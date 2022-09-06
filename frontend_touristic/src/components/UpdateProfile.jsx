import styles from "../styles/updateProfile.module.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserProvider";
import { alertError, alertSuccess } from "../utilities/Alerts";
import { ToastContainer } from "react-toastify";

const UpdateProfile = ({ userData }) => {
  const initialState = {
    nombre: "",
    correo: "",
  };
  const { setUploadProfile } = useContext(UserContext);
  const [user, setUser] = useState(initialState);
  useEffect(() => {
    const user = {
      nombre: userData[0].nombre,
      correo: userData[0].correo,
    };
    setUser(user);
  }, [userData]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const URI = `https://mapzoratama.herokuapp.com/api/users/${userData[0].ID_Usuario}`;
      const res = await axios.put(URI, user);
      alertSuccess(res.data.results.message);
      setUploadProfile(true);
    } catch (error) {
      alertError(error);
    }
  };
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h3 className={`text-center ${styles["title"]}`}>
        Actualizar información
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <label className={styles.text}>Nombre(s)</label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className={styles.text}>Correo</label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                name="correo"
                value={user.correo}
                onChange={handleChange}
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

export default UpdateProfile;
