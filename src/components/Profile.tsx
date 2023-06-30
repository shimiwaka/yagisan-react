import axios from "axios";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [message, setMessage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureMode, setSecureMode] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    var urlParams = new URLSearchParams();
    urlParams.append("accessToken", Cookies.get("access_token") || "");

    axios
      .post(targetURL + "/box/profile", urlParams)
      .then((response) => {
        if (response.data.success) {
          setEmail(response.data.email);
          setUsername(response.data.username);
          setDescription(response.data.description);
          setSecureMode(response.data.SecureMode);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message;
        if (errorMessage === "invalid access token") {
          Cookies.remove("access_token");
          navigate("/");
        } else {
          alert(errorMessage);
        }
      });
  }, []);

  const sendUpdateRequest = () => {
    var urlParams = new URLSearchParams();
    urlParams.append("newUsername", username);
    urlParams.append("newPassword", password);
    urlParams.append("newEmail", email);
    urlParams.append("newDescription", description);
    urlParams.append("password", confirmPassword);
    urlParams.append("newSecureMode", secureMode ? "true" : "false");
    urlParams.append("accessToken", Cookies.get("access_token") || "");

    axios
      .post(targetURL + "/box/update", urlParams)
      .then((response) => {
        if (response.data.success) {
          setMessage("更新に成功しました！");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message;
        if (errorMessage === "password must be at least 8 characters") {
          alert("パスワードは最低でも8文字にしてください。");
        } else if (errorMessage === "username must be at least 3 characters") {
          alert("ユーザー名は最低でも3文字にしてください。");
        } else if (
          errorMessage === "username must be only alphabet, number and _."
        ) {
          alert("ユーザー名は半角英数字と_のみが使えます。");
        } else if (errorMessage === "password is wrong") {
          alert("パスワードが間違っています。");
        } else if (errorMessage === "invalid access token") {
          Cookies.remove("access_token");
          navigate("/");
        } else {
          alert("原因不明のエラーです。");
        }
      });
  };
  return (
    <>
      <div>
        ユーザー名 :{" "}
        <input
          placeholder="3文字以上を指定"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
      </div>
      <div>
        パスワード :{" "}
        <input
          placeholder="8文字以上を指定"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        メールアドレス :{" "}
        <input onChange={(e) => setEmail(e.target.value)} value={email}></input>
      </div>
      <div>
        自己紹介 :{" "}
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div>
        メールアドレスを要求する :{" "}
        <input
          type="checkbox"
          checked={secureMode}
          onChange={() => setSecureMode((prevState) => !prevState)}
        ></input>
      </div>
      <div>
        設定を変更するにはパスワードが必要です :{" "}
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        ></input>
      </div>
      <button
        onClick={() => {
          sendUpdateRequest();
        }}
      >
        更新
      </button>
      <div>{message}</div>
    </>
  );
};

export default Profile;
