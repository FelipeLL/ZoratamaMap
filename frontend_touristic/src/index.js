import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import UserProvider from './context/UserProvider';
import Auth from "./components/Auth";
import Loader from './components/Loader';

const Register = lazy(() => import('./routes/Register'))
const MapView = lazy(() => import('./routes/MapView'))

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/mapView" element={<Auth>
                <MapView />
              </Auth>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProvider>

  </React.StrictMode>,
  document.getElementById("root")
)

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Corremos este código si hay una nueva versión de nuestra app
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
      window.location.reload();
    }
  },
});