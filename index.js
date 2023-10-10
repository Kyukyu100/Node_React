const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/key");

// application/x-ww-form-urlencoded 데이터타입 가져올 수 있도록하는 옵션
app.use(bodyParser.urlencoded({ extended: true }));
// json 데이터 타입 옵션을 가져오기 위한 옵션
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connect..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("node js 테스트중 dev 테스트용");
});

app.post("/register", (req, res) => {
  // 회원가입시 필요한 정보들은 client에서 가져오면
  // 해당 데이터들을 DB에 넣어준다.
  const user = new User(req.body);
  // save =>  mongoDB에서 지원하는 메소드
  // 전송에 성공했다면 true를 아니라면 err메시지를 return
  // mongoDB의 함수 권장방식 변경으로 인하여 인강과 다르게 작성.
  user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
