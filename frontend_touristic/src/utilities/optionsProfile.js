import ViewProfile from "../components/ViewProfile"
import UpdateProfile from "../components/UpdateProfile"
import UpdatePassword from "../components/UpdatePassword"

export const optionsProfile = (option, userData) => {


    switch (option) {
        case "1":
            return <ViewProfile userData={userData} />
        case "2":
            return <UpdateProfile userData={userData} />;
        case "3":
            return <UpdatePassword userData={userData} />;
        default:
            return "Ocurrio un error en el server";
    }
}