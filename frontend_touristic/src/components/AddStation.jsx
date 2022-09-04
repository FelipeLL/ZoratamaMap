import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/addStation.module.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useState, useContext, useRef } from "react";
import { UserContext } from "../context/UserProvider";
import { alertError, alertInfo, alertWarning } from "../utilities/Alerts";

const AddStation = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    longitud: "",
    latitud: "",
  };

  const inputNameRef = useRef(null);
  const inputLngRef = useRef(null);
  const inputLatRef = useRef(null);
  const inputDesRef = useRef(null);

  const URI = "https://mapzoratama.herokuapp.com/api/estaciones";

  const [estaciones, setEstaciones] = useState(initialState);
  const { setUpload } = useContext(UserContext);
  const { nombre, longitud, latitud } = estaciones;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!longitud.trim() || !latitud.trim() || !nombre.trim()) {
        alertWarning("Complete todos los campos");
        return;
      }

      await axios.post(URI, estaciones);
      setUpload(true);
      setEstaciones({
        nombre: "",
        descripcion: "",
        longitud: "",
        latitud: "",
      });
      handleResetValues();
      alertInfo("Estación agregada correctamente");
    } catch (error) {
      alertError(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstaciones((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleResetValues = () => {
    inputNameRef.current.value = "";
    inputLngRef.current.value = "";
    inputLatRef.current.value = "";
    inputDesRef.current.value = "";
  };

  return (
    <>
      <h3 className={`${styles["logo_name"]} text-center`}>Añadir estación</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Nombre
            </label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                id="exampleInputEmail1"
                name="nombre"
                onChange={handleChange}
                ref={inputNameRef}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Longitud
            </label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                id="exampleInputEmail1"
                name="longitud"
                onChange={handleChange}
                ref={inputLngRef}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="exampleInputEmail2" className={styles.text}>
              Latitud
            </label>
            <div className={styles["input-box"]}>
              <input
                type="text"
                id="exampleInputEmail2"
                name="latitud"
                onChange={handleChange}
                ref={inputLatRef}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail1" className={styles.text}>
              Descripción
            </label>

            <div className={styles["input-box"]}>
              <textarea
                name="descripcion"
                type="text"
                cols="30"
                rows="15"
                onChange={handleChange}
                ref={inputDesRef}
              />
            </div>
          </div>
        </div>

        <div className={styles["input-box-2"]}>
          <span className={styles["button-box"]}>
            <button type="submit">Guardar</button>
          </span>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default AddStation;
