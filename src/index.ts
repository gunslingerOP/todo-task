import express = require("express");
import userV1 from "../routes/user/v1";
import todoV1 from "../routes/todo/v1";
import dataV1 from "../routes/data/v1";
let port = 3000;
const app = express();

app.use(express.json());
app.use("/v1", userV1);
app.use("/v1/todo", todoV1);
app.use("/v1/data", dataV1);
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
