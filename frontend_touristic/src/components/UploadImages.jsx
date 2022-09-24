import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/uploadImages.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { alertWarning } from "../utilities/Alerts";

const UploadImages = () => {
  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://mapzoratama.herokuapp.com/api/estaciones";
      const res = await axios.get(URI);
      setData(res.data);
    };
    axiosData();
  }, []);

  const { setUploadImage } = useContext(UserContext);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setselectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [estaciones, setEstaciones] = useState({
    estacion: "Seleccionar estación",
  });
  const inputFileRef = useRef(null);
  const imgRef = useRef(null);
  const selectRef = useRef(null);

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    if (!file) {
      console.log("necesitas cargar un archivo");
      return;
    }

    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidType) {
      console.log("tipo de formato no valido");
      return;
    }

    setFile(file);

    setFileName(file.name);

    //convertir imagen a base 64
    const reader = new FileReader();

    //cuando termine el proceso se guarda la información de la imagen en base 64
    reader.onloadend = () => {
      setselectedFile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstaciones((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleRef = () => {
    inputFileRef.current.value = "";
    imgRef.current.src = "";
    setFileName(null);
    setFile(null);
    setselectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (estaciones.estacion === "Seleccionar estación") {
      alertWarning("Debe seleccionar una estación");
      return;
    }
    if (!file) {
      alertWarning("Debe cargar un archivo");
      return;
    }
    const formdata = new FormData();
    formdata.append("image", file);
    await toast.promise(
      axios.post(
        "https://mapzoratama.herokuapp.com/api/images/upload/" +
          estaciones.estacion,
        formdata
      ),
      {
        pending: "La imagen se esta subiendo",
        success: "Se ha subido la imagen 👌",
        error: "Error al cargar la imagen 🤯",
      },
      {
        position: toast.POSITION.TOP_LEFT,
      }
    );
    setUploadImage(true);
    inputFileRef.current.value = "";
    imgRef.current.src = "";
    setFileName(null);
    setFile(null);
    selectRef.current.value = "Seleccionar estación";
    setEstaciones({ estacion: "Seleccionar estación" });
  };

  return (
    <div>
      <h3 className={`text-center ${styles["logo_name"]}`}>Imagenes</h3>
      <div className="container">
        <h3 className={styles.text}>Seleccionar estación</h3>

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

        <h3 className={styles.text}>Elegir imagen</h3>
      </div>
      <div className={styles.contenedor}>
        <div className={styles["w_rapper"]}>
          <div className={styles.image}>
            <img src={selectedFile} alt="preview" ref={imgRef} />
          </div>
          <div className="content">
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </div>
            <div className={styles["text-image"]}>
              ¡No ha elegido ningún archivo!
            </div>
          </div>
          <div className={styles["cancel-btn"]}>
            <FontAwesomeIcon
              icon={faXmark}
              className={
                fileName
                  ? styles["cancel-btn-icon"]
                  : styles["cancel-btn-icon-disable"]
              }
              onClick={handleRef}
            />
          </div>
          <div
            className={
              fileName === null
                ? `${styles["file-name-disable"]}`
                : `${styles["file-name"]}`
            }
          >
            {fileName}
          </div>
        </div>
      </div>
      <div className={styles["container-custom-input"]}>
        <input
          type="file"
          className={styles["custom-input"]}
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .gif, .png"
          ref={inputFileRef}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <span className={styles["button-box"]}>
          <button type="submit">Guardar</button>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UploadImages;
