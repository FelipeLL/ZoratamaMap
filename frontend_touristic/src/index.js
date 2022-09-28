import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "mapbox-gl/dist/mapbox-gl.css";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

