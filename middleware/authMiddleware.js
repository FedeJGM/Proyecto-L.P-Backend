import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

// next detiene la ejecución en caso de algun error o no se le pase un dato
const checkAuth = async (req, res, next) => {
  let token;
  if (
    // Linea 9 es el token | .startWith verifica si contiene el Bearer en la API
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // aquí va a intentar decifrar el token
    try {
      // .split(" ")[1] elimina la parte del Bearer y el espacio que se encuentra con el token
      token = req.headers.authorization.split(" ")[1];
      // cuando ya tengo acceso a los datos y .verify para verificarlo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // .select ( "- ...") para eliminar lo que no me interesa de la petición | req.veterinario es de express(sección)
      req.veterinario = await Veterinario.findById(decoded.id).select(
        "-password -token -confirmado"
      );
      return next();
    } catch (error) {
      const e = new Error("Token no Válido");
      return res.status(403).json({ msg: e.message });
    }
  }

  // en caso de que hubo nunca un token
  if (!token) {
    const error = new Error("Token no Válido o inexistente");
    res.status(403).json({ msg: error.message });
  }
  // next para que siga la ejecución del sg archivo y no se quede en un bucle
  next();
};

export default checkAuth;
