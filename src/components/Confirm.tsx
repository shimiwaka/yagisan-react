import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Confirm = () => {
  const params = useParams();
  const [message, setMessage] = React.useState("")

  React.useEffect(() => {
    axios.get(targetURL + "/confirm/" + params.token)
    .then((response) => {
      if(response.data.success) {
        setMessage("送信しました！");
      } else {
        alert(response.data.message);
      }
    })
    .catch((error : any) => {
      alert(error.response.data.message);
    });
  }, [params.token]);

  return (
    <>
      <div>メール認証</div>
      <div>{message}</div>
      <div>
        <Link to="/register">新規登録</Link>
      </div>
    </>
  );
};

export default Confirm;
