import styles from "../styles/imageModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const ImageModal = ({ showImageModal, setShowImageModal, image, setImage }) => {
  return (
    <section
      className={
        showImageModal
          ? `${styles.section} ${styles["active"]}`
          : styles.section
      }
    >
      <div className={`${styles["popup-outer"]}`}>
        <div className={styles["popup-box"]}>
          <div className={styles["box-header"]}>
            <p>{image.name}</p>
            <FontAwesomeIcon
              icon={faRectangleXmark}
              className={styles.close}
              onClick={() => {
                setShowImageModal(false);
                setImage({});
              }}
            />
          </div>

          <div className={styles["box-body"]}>
            <div className={styles["container-img"]}>
              <img src={image.url} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageModal;
