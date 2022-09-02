import styles from "../styles/station.module.css";
import Station from "./Station";

const Slider = ({ sliderStation, setSliderStation, estacion, data }) => {
  return (
    <>
      <div
        className={
          sliderStation
            ? `${styles.sidebar}`
            : `${styles.sidebar} ${styles.collapse}`
        }
      >
        <div className={`${styles["sidebar-content"]}`}>
          <div className={styles.dashboard}>
            <Station
              estacion={estacion}
              data={data}
              setSliderStation={setSliderStation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
