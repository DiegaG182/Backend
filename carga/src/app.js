import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`Peticion tomada por ${process.pid} en el puerto ${PORT}`);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
