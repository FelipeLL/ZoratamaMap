import styles from "../styles/profile.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faKey,
  faUser,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { optionsProfile } from "../utilities/optionsProfile";
import { UserContext } from "../context/UserProvider";

const Profile = ({ sliderProfile, setSliderProfile }) => {
  const [siderOn, setSiderOn] = useState(true);
  const [option, setOption] = useState("1");
  const [userData, setUserData] = useState([]);
  const { idUser, setIdUser } = useContext(UserContext);
  const { uploadProfile, setUploadProfile } = useContext(UserContext);

  useEffect(() => {
    readToken();
  }, []);

  useEffect(() => {
    const getDataUser = async () => {
      const URI =
        "https://zoratamamap.up.railway.app/api/users/getOne/" + idUser;
      const res = await axios.get(URI);
      setUserData(res.data);
      setUploadProfile(false);
    };
    if (idUser !== "") {
      getDataUser();
    }
  }, [idUser, uploadProfile]);

  const readToken = async () => {
    const res = await axios({
      method: "get",
      url: "https://zoratamamap.up.railway.app/api/auth",
      withCredentials: true,
    });
    if (res.data.isToken) {
      setIdUser(res.data.idUser);
    }
  };

  return (
    <div
      className={
        sliderProfile
          ? `${styles.sidebar}`
          : `${styles.sidebar} ${styles.collapse}`
      }
    >
      <div className={`${styles["sidebar-content"]}`}>
        <nav className={siderOn ? `${styles.nav} ${styles.close}` : styles.nav}>
          <div className={styles["logo-name"]}>
            <div
              className={styles["logo-image"]}
              onClick={() => {
                setSiderOn(!siderOn);
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                /* style={{ fontSize: "27px", color: "#1a1a1a" }} */
                className={styles["icon-menu"]}
              />
            </div>

            <span className={styles["logo_name"]}>Perfil </span>
          </div>

          <div className={styles["menu-items"]}>
            <ul
              className={
                siderOn
                  ? `${styles["nav-links"]} ${styles.close}`
                  : styles["nav-links"]
              }
            >
              <li>
                <Link to="" onClick={() => setOption("1")}>
                  <FontAwesomeIcon icon={faUser} className={styles.icons} />
                  <span className={styles["link-name"]}>Ver perfil</span>
                </Link>
              </li>
              <li className="">
                <Link to="" onClick={() => setOption("2")}>
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className={styles.icons}
                  />
                  <span className={`${styles["link-name"]}`}>
                    Actualizar información
                  </span>
                </Link>
              </li>
              <li>
                <Link to="" onClick={() => setOption("3")}>
                  <FontAwesomeIcon icon={faKey} className={styles.icons} />
                  <span className={styles["link-name"]}>
                    Actualizar contraseña
                  </span>
                </Link>
              </li>
              <li>
                <Link to="" onClick={() => setSliderProfile(false)}>
                  <FontAwesomeIcon
                    icon={faHandPointLeft}
                    className={styles.icons}
                  />
                  <span className={styles["link-name"]}>Devolverse</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <section className={styles.dashboard}>
          {optionsProfile(option, userData)}
        </section>
      </div>
    </div>
  );
};

export default Profile;
