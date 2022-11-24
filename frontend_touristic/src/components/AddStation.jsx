import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/addStation.module.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { alertError, alertInfo, alertWarning } from "../utilities/Alerts";

const AddStation = () => {
  const initialState = {
    nombre: "",
    descripcion: "",
    longitud: "",
    latitud: "",
  };

  const initialStateIcon = {
    icon: "Seleccionar",
  };

  const inputNameRef = useRef(null);
  const inputLngRef = useRef(null);
  const inputLatRef = useRef(null);
  const inputDesRef = useRef(null);
  const [estaciones, setEstaciones] = useState(initialState);
  const [icons, setIcons] = useState(initialStateIcon);
  const [urlIcon, setUrlIcon] = useState("");
  const [data, setData] = useState([]);
  const { setUpload, upload } = useContext(UserContext);
  const { nombre, longitud, latitud } = estaciones;

  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://zoratama-map.herokuapp.com/api/iconos";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, [upload]);

  useEffect(() => {
    if (data.length !== 0 && icons.icon !== "Seleccionar") {
      const icon = data.filter((icono) => icono.ID_Icono == icons.icon);
      setUrlIcon(icon[0].url);
    } else if (icons.icon === "Seleccionar") {
      setUrlIcon("");
    }
  }, [icons]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!longitud.trim() || !latitud.trim() || !nombre.trim()) {
        alertWarning("Complete todos los campos");
        return;
      }

      if (icons.icon === "Seleccionar") {
        alertWarning("Seleccione un icono");
        return;
      }
      const estacion = {
        nombre: estaciones.nombre,
        descripcion: estaciones.descripcion,
        icono: icons.icon,
        longitud: estaciones.longitud,
        latitud: estaciones.latitud,
      };
      const URI = "https://zoratama-map.herokuapp.com/api/estaciones";
      await axios.post(URI, estacion);
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

  const handleChangeIcons = (e) => {
    const { name, value } = e.target;
    setIcons((old) => ({
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
            <label className={styles.text}>Nombre</label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                name="nombre"
                onChange={handleChange}
                ref={inputNameRef}
              />
            </div>
          </div>
          <div className="col-9">
            <label className={styles.text}>Icono</label>

            <select
              className={`form-select ${styles.select}`}
              name="icon"
              onChange={handleChangeIcons}
            >
              <option defaultValue={"0"}>Seleccionar</option>
              {data.map((icono) => (
                <option key={icono.ID_Icono} value={icono.ID_Icono}>
                  {icono.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={`col-3 ${styles["contenedor-icon"]}`}>
            <img src={urlIcon} alt="icon" />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label className={styles.text}>Longitud</label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                name="longitud"
                onChange={handleChange}
                ref={inputLngRef}
              />
            </div>
          </div>
          <div className="col-6">
            <label className={styles.text}>Latitud</label>
            <div className={styles["input-box"]}>
              <input
                type="text"
                name="latitud"
                onChange={handleChange}
                ref={inputLatRef}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className={styles.text}>Descripción</label>

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
