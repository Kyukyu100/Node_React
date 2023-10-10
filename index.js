const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://back:qsw01311@cluster0.ui2j1ox.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connect..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("node js 테스트중");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
