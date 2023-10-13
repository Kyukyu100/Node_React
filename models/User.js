const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// saltRounds -> 글자수
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// pre => mongoose 메소드 : 매개변수안 작업을 하기전 실행
userSchema.pre("save", function (next) {
  // 비밀번호를 암호화 시킨다.
  // user -> userSchema 객체
  var user = this;
  // .isModified -> 비밀번호가 변경될 암호화된다.
  if (user.isModified("passoword")) {
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    // 함수안에서의 this -> userSchma
    var user = this;

    if (user.isModified("password")) {
    }
    // hash -> 암호화된 비밀번호
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // 만약 err가 발생하지 않는다면 암호화된 비밀번호를 user의 password에 입력

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
