import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/deleteStation.module.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { alertInfo, alertWarning } from "../utilities/Alerts";

const DeleteStation = () => {
  const { upload, setUpload } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [estaciones, setEstaciones] = useState({
    estacion: "Seleccionar estación",
  });
  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://mapzoratama.herokuapp.com/api/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, [upload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estaciones.estacion === "Seleccionar estación") {
      alertWarning("Seleccione una estación");
      return;
    }
    const res = await axios.delete(
      `https://mapzoratama.herokuapp.com/api/estaciones/${estaciones.estacion}`
    );
    setUpload(true);
    alertInfo("Estación eliminada correctamente");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstaciones((old) => ({
      ...old,
      [name]: value,
    }));
  };
  return (
    <>
      <h3 className={`text-center ${styles["logo_name"]}`}>
        Eliminar estación
      </h3>
      <select
        className={`form-select ${styles.select}`}
        aria-label="Default select example"
        name="estacion"
        onChange={handleChange}
      >
        <option defaultValue={"0"}>Seleccionar estación</option>
        {data.map((estacion) => (
          <option key={estacion.ID_Estacion} value={estacion.ID_Estacion}>
            {estacion.nombre}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        <span className={styles["button-box"]}>
          <button type="submit">Guardar</button>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};

export default DeleteStation;
