import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
  // instancia con los datos y la forma que tenga ese modelo | req.body para que se genere con la info pasada
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  // se almacena en la DB con toda la info
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  //.where para hacer filtro al veterinario que esté autenticado | .equals variable de seccion del server de express
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(pacientes);
};

// Obtener un paciente en específico
const obtenerPaciente = async (req, res) => {
  // con el id trae el paciente en question
  const { id } = req.params;
  // aquí se consulta
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No Encontrado" });
  }
  // en caso tal de que alguien quiera acceder a info que el no creó
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  // en caso tal de que no encuentre el paciente
  if (!paciente) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  // Actualizar Paciente - moongose - || porque en caso tal que se modifique uno, agreguele lo que ya tiene del objeto
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: "Paciente Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
