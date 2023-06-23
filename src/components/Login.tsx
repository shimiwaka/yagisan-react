import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>ログイン画面</div>
      <div>
        <Link to="/register">新規登録</Link>
      </div>
    </>
  );
};

export default Login;
