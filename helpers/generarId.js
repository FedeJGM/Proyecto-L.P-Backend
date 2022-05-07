const generarId = () => {
  //Con .substring se eliminan los dos primeros caracteres (0.0)
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;
