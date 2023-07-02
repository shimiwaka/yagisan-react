import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const accessToken = Cookies.get("access_token") || "";
    if (accessToken !== "") {
      navigate("/mypage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendLoginRequest = () => {
    var urlParams = new URLSearchParams();
    urlParams.append("username", username);
    urlParams.append("password", password);

    axios
      .post(targetURL + "/login", urlParams)
      .then((response) => {
        if (response.data.success) {
          Cookies.set("access_token", response.data.token);
          navigate("/mypage");
        } else {
          alert("サーバーの不明なエラーです。");
        }
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message;
        if (errorMessage === "lack of parameters") {
          alert("入力されていない値があります。");
        } else if (errorMessage === "account is locked") {
          alert("アカウントがロックされています。30分後に試してください。");
        } else {
          alert("ユーザー名もしくはパスワードが間違っています。");
        }
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    sendLoginRequest();
  };

  return (
    <>
      <div>
        ユーザー名 :{" "}
        <input
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
      <div>
        パスワード :{" "}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
      <div>
        <button
          onClick={() => {
            sendLoginRequest();
          }}
        >
          ログイン
        </button>
      </div>
      <div>
        はじめての方は : <Link to="/register">新規登録</Link>
      </div>
    </>
  );
};

export default Login;
