import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  //.sign crear un  new jwt
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //autenticar User time
    expiresIn: "30d",
  });
};

export default generarJWT;
