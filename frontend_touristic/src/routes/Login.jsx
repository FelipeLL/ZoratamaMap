import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/login.module.css";
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";
import FormError from "../components/FormError";
import { alertError } from "../utilities/Alerts";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { required } = formValidate();
  const navigate = useNavigate();

  const URI = "https://mapzoratama.herokuapp.com/api/auth";

  const { setAdmin } = useContext(UserContext);
  const { online, setOnline } = useContext(UserContext);

  useEffect(() => {
    provideAccess();
  }, [online]);

  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: URI,
        data,
        withCredentials: true,
      });
      setOnline(res.data.results.isOnline);
      setAdmin(res.data.results.isAdmin);
    } catch (error) {
      alertError(error.response.data);
    }
  };

  const provideAccess = () => {
    online && navigate("/mapView");
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-lg-7 d-none d-lg-block">
          {/* <!--d lg block para que se muestra a partir de dispositivos medianos--> */}

          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {/* <!--IMAGEN 1--> */}
              <div
                className={`carousel-item min-vh-100 active ${styles["img-1"]}`}
                data-bs-interval="2500"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="fw-bold">Descubre algo sorprendete</h5>
                </div>
              </div>
              {/* <!--IMAGEN 2--> */}
              <div
                className={`carousel-item min-vh-100 ${styles["img-2"]}`}
                data-bs-interval="2500"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                </div>
              </div>
              {/* <!--IMAGEN 3--> */}
              <div
                className={`carousel-item min-vh-100 ${styles["img-3"]}`}
                data-bs-interval="2500"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className={`col-lg-5 ${styles.login}`}>
          <div className={styles.content}>
            <div className={styles["login-box"]}>
              <div className={styles.header}>
                <img
                  src="https://zoratamagallery.sfo3.digitaloceanspaces.com/Iconos/logo.svg"
                  alt="logo"
                />
              </div>

              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["input-box"]}>
                  <input
                    type="text"
                    placeholder="Ingresa tu correo electrónico"
                    name="email"
                    {...register("email", {
                      required,
                    })}
                  />
                </div>
                {errors.email && <FormError error={errors.email} />}

                <div className={styles["input-box"]}>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    {...register("password", {
                      required,
                    })}
                  />
                </div>
                {errors.password && <FormError error={errors.password} />}

                <span className={styles["button-box"]}>
                  <button>Iniciar Sesión</button>
                </span>
              </form>
            </div>
            <div className={styles["login-box"]}>
              <p className={styles["text"]}>
                ¿Todavía no tienes una cuenta?
                <Link to="/register">Registrarse</Link>
              </p>
            </div>
            <div className={styles.app}>
              <p>Descarga la aplicación.</p>
              <div className={styles["app-img"]}>
                <a href="#">
                  <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/4b70f6fae447.png" />
                </a>
                <a href="#">
                  <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/f06b908907d5.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
