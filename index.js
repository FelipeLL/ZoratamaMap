import express from "express";
import fileUpload from "express-fileupload";
import expressStaticGzip from "express-static-gzip"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cookieParser from "cookie-parser";
import cors from "cors";
import { Config } from "./config/index.js";
import db from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"
import estacionRoute from "./routes/estacionRoute.js"
import imageRoute from "./routes/imageRoute.js"
import iconoRoute from "./routes/iconoRoute.js"


const app = express();

//para trabajar con las cookies.
app.use(cookieParser());

//sirve para procesar los datos enviados desde los forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Hacer que node sirva los archivos de nuestro app React
/* app.use(express.static(path.resolve(__dirname, "../frontend_touristic/build"))) */

//carpeta temporal donde se van a estar "temporalmente" los archivos que se suben
app.use(fileUpload({
  tempFileDir: "/temp"
}))

const corsConfig = {
  credentials: true,
  origin: ['https://zoratama-map.netlify.app', "https://mapzoratama.herokuapp.com", "https://zoratamamap.up.railway.app"],
};
app.use(cors(corsConfig));


//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/estaciones", estacionRoute);
app.use("/api/images", imageRoute);
app.use("/api/iconos", iconoRoute);

//conexión a la base de datos
try {
  console.log(Config.database);
  await db.authenticate();
  console.log("conexión exitosa a la BD");
} catch (error) {
  console.log("error a la BD: " + error);
}

app.get("/api/", (req, res) => {
  res.json({ message: "active" })
})

if (process.env.NODE_ENV === 'production') {

  app.use(
    expressStaticGzip(path.join(__dirname, 'frontend_touristic/build'), {
      enableBrotli: true,
    })
  )

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'frontend_touristic/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend_touristic/build', 'index.html'));
  });
} else {
  console.log("no esta en producción");
}

app.listen(Config.port, () => {
  console.log("server listening on port " + Config.port);
});


