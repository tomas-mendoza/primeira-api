import app from "./app";

const port = 8080;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});