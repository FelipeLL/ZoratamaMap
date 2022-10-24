import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [online, setOnline] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [admin, setAdmin] = useState(false);
  const [upload, setUpload] = useState(false);
  const [uploadProfile, setUploadProfile] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [directions, setDirections] = useState({});
  const [profile, setProfile] = useState("driving");
  const [sliderIndications, setSliderIndications] = useState(false);

  useEffect(() => {
    readToken();
  }, []);

  const readToken = async () => {
    const res = await axios({
      method: "get",
      url: "https://zoratamamap.up.railway.app/api/auth",
      withCredentials: true,
    });
    if (res.data.isToken) {
      setIdUser(res.data.idUser);
      res.data.isAdmin && setAdmin(true);
      setOnline(true);
    } else {
      setOnline(null);
    }
  };
  return (
    <UserContext.Provider
      value={{
        online,
        setOnline,
        upload,
        setUpload,
        uploadImage,
        setUploadImage,
        admin,
        setAdmin,
        idUser,
        setIdUser,
        uploadProfile,
        setUploadProfile,
        directions,
        setDirections,
        sliderIndications,
        setSliderIndications,
        profile,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
