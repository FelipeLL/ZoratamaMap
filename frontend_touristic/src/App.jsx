import { Outlet } from "react-router-dom";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";

const App = () => {
  const { online } = useContext(UserContext);
  if (online === false) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
