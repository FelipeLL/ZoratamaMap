import styles from "../styles/viewProfile.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { alertWarning } from "../utilities/Alerts";
import { toast, ToastContainer } from "react-toastify";

const ViewProfile = ({ userData }) => {
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setselectedFile] = useState(null);
  const { setUploadProfile } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alertWarning("Debe cargar un archivo");
      return;
    }
    const formdata = new FormData();
    formdata.append("image", file);

    await toast.promise(
      axios.put(
        "https://zoratamamap.up.railway.app/api/users/imageProfile/" +
          userData[0].ID_Usuario,
        formdata
      ),
      {
        pending: "La imagen se esta subiendo...",
        success: "Imagen de perfil subida correctamente 👌",
        error: "Error al cargar la imagen 🤯",
      },
      {
        position: toast.POSITION.TOP_LEFT,
      }
    );
    setUploadProfile(true);
    setFile(null);
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    if (!file) {
      console.log("necesitas cargar un archivo");
      return;
    }

    const isNameOfOneImageRegEx = /.(jpe?g|gif|png|svg)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidType) {
      console.log("tipo de formato no valido");
      return;
    }

    setFile(file);

    //convertir imagen a base 64
    const reader = new FileReader();

    //cuando termine el proceso se guarda la información de la imagen en base 64
    reader.onloadend = () => {
      setselectedFile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleActiveInput = () => {
    inputFileRef.current.click();
  };

  const handleDeleteAccount = async () => {
    try {
      await axios({
        method: "delete",
        url: `https://zoratamamap.up.railway.app/api/users/${userData[0].ID_Usuario}`,
        withCredentials: true,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={`${styles.profile} ${styles["profile-card"]}     `}>
      <div className={styles["profile-title"]}>PERFIL</div>
      <div className={`${styles["profile-circular"]}`}>
        <img
          src={
            selectedFile
              ? selectedFile
              : userData.length !== 0
              ? userData[0].fotografia
              : ""
          }
          alt="profile"
        />
        <div className={styles.shadow}>
          <FontAwesomeIcon
            icon={faCamera}
            onClick={handleActiveInput}
            className={styles["shadow-camera"]}
          />
          <input
            className={styles["custom-input"]}
            type="file"
            onChange={handleFileChange}
            ref={inputFileRef}
            accept=".jpg, .jpeg, .gif, .png, .svg"
          />
        </div>
      </div>
      <p className={styles["profile-text"]}>
        {userData.length !== 0 && `${userData[0].nombre}`}
      </p>
      <div className={styles["profile-contact"]}>
        <p>Correo electrónico: </p>
        <p>{userData.length !== 0 && userData[0].correo}</p>
      </div>
      <div className={styles["buttons-profile"]}>
        <div className="dropdown">
          <button
            className={`dropdown-toggle ${styles["btn-dropdown"]}`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Eliminar cuenta
          </button>
          <ul className={`dropdown-menu ${styles["drop-menu"]}`}>
            <li>
              <a
                className={`dropdown-item`}
                onClick={handleDeleteAccount}
                href="/"
              >
                Eliminar
              </a>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <span className={styles["button-box"]}>
            <button className={styles["button-update"]}>
              Actualizar imagen
            </button>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewProfile;
