import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

//Estructura del modelo de veterinario
const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  telefono: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

// .pre antes de que se almacene la info de arriba
veterinarioSchema.pre("save", async function (next) {
  // Condicion que ignora si la contraseña ya se encuentra hasheada
  if (!this.isModified("password")) {
    next();
  }
  // .genSalt = Rondas de hasheo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Funcion que solo se registra en schema o modelo
veterinarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  //bcrypt.compare me permite comparar hasheado con inicial password
  return await bcrypt.compare(passwordFormulario, this.password);
};

//Con esta variable queda registrado en DataBase
const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;
