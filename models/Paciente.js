import mongoose from "mongoose";

// Line 28 - 29 hace referencia que almacena el Id del Veterinario
const pacientesSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    sintomas: {
      type: String,
      required: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
    },
  },
  {
    // esta linea nos crea las columnas de editado y creado
    timestamps: true,
  }
);

// Guarda la referencia del modelo y la forma de la info que lleva ellos con pacientesSchema
const Paciente = mongoose.model("Paciente", pacientesSchema);

export default Paciente;
