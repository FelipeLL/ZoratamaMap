import EstacionModel from "../models/EstacionModel.js";
import ImageModel from "../models/ImageModel.js";
import { getAll, create, deleteOne, update } from "../services/estacionService.js";

export const getAllEstaciones = async (req, res) => {
  try {
    let results = await getAll()
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const createEstacion = async (req, res) => {
  try {
    let results = await create(req.body.nombre, req.body.descripcion, req.body.longitud, req.body.latitud, req.body.icono)
    res.json(results)
  } catch (error) {
    res.status(400).json({ error: error })

  }
}

export const deleteEstacion = async (req, res) => {
  try {

    let results = await deleteOne(req.params.id)
    res.json(results)
  } catch (error) {
    res.status(400).json({ error: error })
  }
};

export const updateEstacion = async (req, res) => {
  try {

    let results = await update(req.body.nombre, req.body.descripcion, req.body.longitud, req.body.latitud, req.params.id)
    res.json(results)

  } catch (error) {
    res.status(400).json({ error: error })
  }
};



