import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("投書箱です。");

  const navigate = useNavigate();

  React.useEffect(() => {
    const accessToken = Cookies.get("access_token") || "";
    if (accessToken !== "") {
      navigate("/mypage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendRegisterRequest = () => {
    var urlParams = new URLSearchParams();
    urlParams.append("username", username);
    urlParams.append("password", password);
    urlParams.append("email", email);
    urlParams.append("description", description);

    axios
      .post(targetURL + "/register", urlParams)
      .then((response) => {
        if (response.data.success) {
          Cookies.set("access_token", response.data.token);
          navigate("/mypage");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message;
        const regex = /^Error 1062/;
        if (errorMessage === "lack of parameters"){
          alert("必要な情報が入力されていません。");
        } else if(errorMessage === "password must be at least 8 characters") {
          alert("パスワードは最低でも8文字にしてください。");
        } else if(errorMessage === "username must be at least 3 characters") {
          alert("ユーザー名は最低でも3文字にしてください。");
        } else if(errorMessage === "username must be only alphabet, number and _.") {
          alert("ユーザー名は半角英数字と_のみが使えます。");
        } else if (regex.test(errorMessage)) {
          alert("ユーザー名かメールアドレスが重複しています。");
        } else {
          alert("原因不明のエラーです。");
        }
      });
  };

  return (
    <>
      <div>
        ユーザー名 :{" "}
        <input placeholder="3文字以上を指定" onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div>
        パスワード :{" "}
        <input
          placeholder="8文字以上を指定"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        メールアドレス :{" "}
        <input onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        自己紹介 :{" "}
        <textarea onChange={(e) => setDescription(e.target.value)}>
          投書箱です。
        </textarea>
      </div>
      <div>
        <button
          onClick={() => {
            sendRegisterRequest();
          }}
        >
          登録
        </button>
      </div>
      <div>
        アカウントがすでにある場合は : <Link to="/">ログイン</Link>
      </div>
    </>
  );
};

export default Register;
