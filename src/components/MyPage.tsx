import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const MyPage = () => {
  alert(Cookies.get("access_token"))

  return (
    <>
      <div>マイページ</div>
      <div>
        <Link to="/register">新規登録</Link>
      </div>
    </>
  );
};

export default MyPage;
