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
import { alertError, alertInfo } from "../utilities/Alerts";
import ImageModal from "./ImageModal";

const Station = ({ estacion, data, setSliderStation }) => {
  //en el result se guarda la estación en especifico
  let result = data.filter((item) => item.ID_Estacion === estacion);
  const [imageList, setImageList] = useState([]);
  const [image, setImage] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const { uploadImage, setUploadImage } = useContext(UserContext);
  const { admin, directions, setDirections, setSliderIndications, profile } =
    useContext(UserContext);

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

  const handleLocation = async () => {
    const successPosition = async (location) => {
      const TOKEN =
        "pk.eyJ1IjoiamZlbGlwZWxhZGlubyIsImEiOiJjbDFmbHF1dzUwMXo1M2JudDQwNjVoNWw3In0.wiRr4CxecJHGtM18meygeQ";
      const prof = profile;
      const from = [location.coords.longitude, location.coords.latitude];
      const to = [result[0].longitud, result[0].latitud];
      const URI = `https://api.mapbox.com/directions/v5/mapbox/${prof}/${from};${to}?geometries=geojson&access_token=${TOKEN}`;
      const res = await axios.get(URI);
      // setDirections(res.data.routes[0].geometry.coordinates);
      setDirections(res.data.routes[0]);
      setSliderStation(false);
      setSliderIndications(true);
    };

    const errorPosition = (err) => {
      alertError("No se otorgaron permisos de ubicación");
    };

    const options = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
    };

    navigator.geolocation.getCurrentPosition(
      successPosition,
      errorPosition,
      options
    );
  };

  const handleShowImage = (url, name) => {
    setImage({
      name,
      url,
    });
    setShowImageModal(true);
  };

  useEffect(() => {
    if (!(Object.entries(directions).length === 0)) {
      handleLocation();
    }
  }, [profile]);

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
          <p className={`text-center  ${styles.title}`}>{item.nombre}</p>

          <FontAwesomeIcon
            onClick={() => {
              setSliderStation(false);
            }}
            icon={faRectangleXmark}
            className={`${styles.icon}`}
          />

          <div className="container">
            <div className={styles.mtop}>
              <p className={styles.description}>{item.descripcion}</p>
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
            <p className={styles["content-text"]} onClick={handleLocation}>
              Indicaciones
            </p>
          </div>
        </div>
        {admin ? (
          <>
            <div className={styles["lista-imagenes"]}>
              {imageList.map((image) => (
                <div key={image.ID_Imagen}>
                  <img
                    src={image.url}
                    alt="Imagen 1"
                    onClick={() => handleShowImage(image.url, image.name)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={`${styles["icon-img"]}`}
                    onClick={() =>
                      handleDeleteImage(image.ID_Imagen, image.name)
                    }
                  />
                </div>
              ))}
            </div>
            <ImageModal
              showImageModal={showImageModal}
              setShowImageModal={setShowImageModal}
              image={image}
              setImage={setImage}
            />
          </>
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
