import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Box = () => {
  const params = useParams();

  const [question, setQuestion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    var urlParams = new URLSearchParams();
    urlParams.append("username", params.username || "");

    axios
      .post(targetURL + "/box/profile", urlParams)
      .then((response) => {
        if (response.data.success) {
          setDescription(response.data.description);
        } else {
          alert("サーバーの不明なエラーです。");
        }
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
      });
  }, [params.username]);

  const sendQuestionRequest = () => {
    var urlParams = new URLSearchParams();
    urlParams.append("context", question);
    urlParams.append("email", email);
    urlParams.append("boxname", params.username || "");

    axios
      .post(targetURL + "/question", urlParams)
      .then((response) => {
        if (response.data.success) {
          setMessage(
            "受理しました。メールアドレスに送られたURLにアクセスすると質問が送信されます。"
          );
          setQuestion("");
        } else {
          alert("サーバーの不明なエラーです。");
        }
      })
      .catch((error: any) => {
        const errorMessage = error.response.data.message;
        if (errorMessage === "character count is over") {
          alert("文字数は10000文字以内にしてください。");
        } else if (errorMessage === "please input email") {
          alert("メールアドレスの入力は必須です。");
        } else {
          alert("サーバーの不明なエラーです。");
        }
      });
  };

  return (
    <>
      <div>{params.username}に質問を送りましょう！</div>
      <div>{description}</div>
      <div className="Message">{message}</div>
      <div>
        メールアドレス：
        <input onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <div className="Small">
          ※いたずら防止のためです。送り先には見えません。
        </div>
      </div>
      <div>
        <textarea
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        ></textarea>
      </div>
      <div>
        <button
          onClick={() => {
            sendQuestionRequest();
          }}
        >
          送信
        </button>
      </div>
      <div>
        自分も <Link to="/register">投書箱を作る</Link>
      </div>
    </>
  );
};

export default Box;
