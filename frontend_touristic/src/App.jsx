import { Outlet } from "react-router-dom";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import Loader from "./components/Loader";

const App = () => {
  const { online } = useContext(UserContext);
  if (online === false) {
    return <Loader />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
