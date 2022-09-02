import profile from "../images/profile_1.jpg";
import styles from "../styles/viewProfile.module.css";
const ViewProfile = ({ userData }) => {
  return (
    <div
      className={`${styles.profile} ${styles["profile-card"]}  ${styles.shadow}   `}
    >
      <div className={styles["profile-title"]}>PERFIL</div>
      <div className={`${styles["profile-circular"]}`}>
        <img src={profile} alt="profile" />
      </div>
      <p className={styles["profile-text"]}>
        {userData.length !== 0 &&
          `${userData[0].nombre} ${userData[0].apellido}`}
      </p>
      <div className={styles["profile-contact"]}>
        <p>(+57) {userData.length !== 0 && userData[0].telefono}</p>
        <p>{userData.length !== 0 && userData[0].correo}</p>
      </div>
    </div>
  );
};

export default ViewProfile;
