export const validateRegister = (req, res, next) => {

  const {
    first_name,
    last_name,
    email,
    age,
    password
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !age ||
    !password
  ) {
    return res.status(400).json({
      status: "error",
      message: "Todos los campos son obligatorios"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "error",
      message: "Password mínimo 6 caracteres"
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email y password requeridos"
    });
  }

  next();
};