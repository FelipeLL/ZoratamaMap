import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/updateStation.module.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserProvider";
import { alertInfo, alertWarning } from "../utilities/Alerts";

const UpdateStation = () => {
  const initialState = {
    estacion: "Seleccionar estación",
    nombre: "",
    longitud: "",
    latitud: "",
    descripcion: "",
  };
  const { upload, setUpload } = useContext(UserContext);
  const selectRef = useRef(null);
  const [data, setData] = useState([]);
  const [estaciones, setEstaciones] = useState(initialState);
  const { estacion } = estaciones;

  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://zoratamamap.herokuapp.com/api/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, [upload]);

  useEffect(() => {
    const dataEstacion = data.filter(
      (item) => item.ID_Estacion === Number(estacion)
    );
    if (dataEstacion.length) {
      const datos = {
        estacion: estacion,
        nombre: dataEstacion[0].nombre,
        longitud: dataEstacion[0].longitud,
        latitud: dataEstacion[0].latitud,
        descripcion: dataEstacion[0].descripcion,
      };

      setEstaciones(datos);
    } else {
      setEstaciones(initialState);
    }
  }, [estacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estacion === "Seleccionar estación") {
      alertWarning("Seleccione una estación");
      return;
    }

    await axios.put(
      `https://zoratamamap.herokuapp.com/api/estaciones/${estacion}`,
      estaciones
    );
    setUpload(true);
    selectRef.current.value = "Seleccionar estación";
    setEstaciones(initialState);
    alertInfo("Estación actualizada correctamente");
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEstaciones((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <h3 className={`text-center ${styles["logo_name"]}`}>
        Actualizar estación
      </h3>
      <select
        className={`form-select ${styles.select}`}
        aria-label="Default select example"
        name="estacion"
        onChange={handleChange}
        ref={selectRef}
      >
        <option defaultValue={"0"}>Seleccionar estación</option>
        {data.map((estacion) => (
          <option key={estacion.ID_Estacion} value={estacion.ID_Estacion}>
            {estacion.nombre}
          </option>
        ))}
      </select>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail30" className={styles.text}>
              Nombre
            </label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                id="exampleInputEmail30"
                name="nombre"
                value={estaciones.nombre}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="exampleInputEmail31" className={styles.text}>
              Longitud
            </label>

            <div className={styles["input-box"]}>
              <input
                type="text"
                id="exampleInputEmail31"
                name="longitud"
                value={estaciones.longitud}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="exampleInputEmail32" className={styles.text}>
              Latitud
            </label>
            <div className={styles["input-box"]}>
              <input
                type="text"
                id="exampleInputEmail32"
                name="latitud"
                value={estaciones.latitud}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="exampleInputEmail33" className={styles.text}>
              Descripción
            </label>

            <div className={styles["input-box"]}>
              <textarea
                name="descripcion"
                value={estaciones.descripcion}
                type="text"
                cols="30"
                rows="10"
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

export default UpdateStation;
