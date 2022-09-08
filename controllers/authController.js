import { login, read } from "../services/authService.js"

export const loginUser = async (req, res) => {
  try {
    let results = await login(req.body.email, req.body.password);
    res.cookie("jwt", results.token, results.cookiesOptions)
    res.json({ results })

  } catch (error) {
    res.status(400).send(error)
  }

}

export const readToken = async (req, res) => {

  try {
    if (req.cookies.jwt) {
      let results = await read(req.cookies.jwt)
      res.json(results);
    } else {
      res.json({ isToken: false });
    }
  } catch (error) {
    res.status(500).send(error)
  }

};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "logout exitoso" })
};

