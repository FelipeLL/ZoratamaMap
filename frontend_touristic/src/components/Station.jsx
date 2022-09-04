import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/imagenes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faCircleXmark,
  faDiamondTurnRight,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { alertInfo } from "../utilities/Alerts";

const Station = ({ estacion, data, setSliderStation }) => {
  //en el result se guarda la estación en especifico
  let result = data.filter((item) => item.ID_Estacion === estacion);
  const [imageList, setImageList] = useState([]);
  const { uploadImage, setUploadImage } = useContext(UserContext);
  const { admin } = useContext(UserContext);

  const handleDeleteImage = async (index, name) => {
    await axios.delete(
      `https://mapzoratama.herokuapp.com/api/images/${index}`,
      {
        data: {
          name,
        },
      }
    );

    setUploadImage(true);
    alertInfo("Imagen eliminada correctamente");
  };

  useEffect(() => {
    const axiosData = async () => {
      if (estacion !== 0) {
        const URI = "https://mapzoratama.herokuapp.com/api/images/" + estacion;

        const res = await axios.get(URI);

        setImageList(res.data);

        setUploadImage(false);
      }
    };
    axiosData();
  }, [estacion, uploadImage]);

  return (
    <>
      {result.map((item) => (
        <div
          key={item.ID_Estacion}
          style={{ borderBottom: "1px solid #d4d4d4" }}
        >
          <h3 className={`text-center fw-bold ${styles.title}`}>
            {item.nombre}
          </h3>

          <FontAwesomeIcon
            onClick={() => {
              setSliderStation(false);
            }}
            icon={faRectangleXmark}
            className={`${styles.icon}`}
          />

          <div className="container">
            <div className={styles.mtop}>
              <p className="fs-6">{item.descripcion}</p>
            </div>
          </div>
        </div>
      ))}

      <div className=" mt-3">
        <div
          style={{
            borderBottom: "1px solid #d4d4d4",
            height: "50px",
          }}
        >
          <div className={styles.content}>
            <span>
              <FontAwesomeIcon
                icon={faDiamondTurnRight}
                className={`${styles.indications}`}
              />
            </span>
            <p className={styles["content-text"]}>Indicaciones</p>
          </div>
        </div>
        {admin ? (
          <div className={styles["lista-imagenes"]}>
            {imageList.map((image) => (
              <div key={image.ID_Imagen}>
                <img src={image.url} alt="Imagen 1" />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={`${styles["icon-img"]}`}
                  onClick={() => handleDeleteImage(image.ID_Imagen, image.name)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles["lista-imagenes"]}>
            {imageList.map((image) => (
              <div key={image.ID_Imagen}>
                <img src={image.url} alt="Imagen 1" />
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Station;
