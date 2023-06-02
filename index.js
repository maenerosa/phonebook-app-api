import app from "./app.js";
import config from "./utils/config.js";

app.get("/", (_req, res) => {
  res.send("This is a simple app for Phonebook");
});

app.listen(config.PORT, () => {
  console.log(`Server is now running on port ${config.PORT}`);
});
