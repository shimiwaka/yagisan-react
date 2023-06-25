import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Box = () => {
  const params = useParams();

  // React.useEffect(() => {
  //   alert(params.username)
  // }, [params.username]);
  const [question, setQuestion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

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
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        // const errorMessage = error.response.data.message;
        // const regex = /^Error 1062/;

        // if (regex.test(errorMessage)) {
        //   alert("ユーザー名かメールアドレスが重複しています。");
        // }
        alert("Error!");
      });
  };

  return (
    <>
      <div>{params.username}に質問を送りましょう！</div>
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
