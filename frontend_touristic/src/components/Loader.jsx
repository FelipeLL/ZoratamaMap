import styles from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles["background-loader"]}>
      <span className={`${styles.loader}`}></span>
    </div>
  );
};

export default Loader;
