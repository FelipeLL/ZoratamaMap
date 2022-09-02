import AddStation from "../components/AddStation";
import DeleteStation from "../components/DeleteStation";
import UpdateStation from "../components/UpdateStation";
import UploadImages from "../components/UploadImages";

export const optionsAdmin = (option) => {
    switch (option) {
        case "1":
            return <AddStation />;
        case "2":
            return <DeleteStation />;
        case "3":
            return <UpdateStation />;
        case "4":
            return <UploadImages />;

        default:
            return "Ocurrio un error en el server";
    }
}