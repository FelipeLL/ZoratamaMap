import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";
const Auth = ({ children }) => {
  const { online } = useContext(UserContext);
  // Si el usuario no esta en linea se cancela el proceso y lo redirige al login que es la ruta raiz
  //esto se hace con el fin de que si no esta online no tenga acceso a las rutas que requieren permiso
  //cabe resaltar que el online no solo depende de cuando se establece en true al hacer el login con datos correctos sino que tambien el UserProvider mediante un efecto lee si el token existe por medio del backend y otorga permisos
  if (!online) {
    return <Navigate to="/" />;
  }
  // En caso de que si este online tendra acceso a las rutas, en este caso el children renderizara esa ruta a la que intenta acceder el usuario
  return children;
};

export default Auth;
