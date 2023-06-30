import axios from "axios";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";
const viewerURL: string = process.env.REACT_APP_VIEWER_BASE_URL || "";

const Question = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = React.useState("");
  const [questionID, setQuestionID] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [answerBody, setAnswerBody] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userAgent, setUserAgent] = React.useState("");
  const [ip, setIP] = React.useState("");
  const params = useParams();

  const formatTime = (timeStr: string) => {
    timeStr = timeStr.replace("T", " ");
    timeStr = timeStr.split("+")[0];
    return timeStr;
  };

  const showID = (email: string, ip: string) => {
    if (email == "") {
      return ip.slice(0, 5);
    } else {
      return email.slice(0, 5) + "-" + ip.slice(0, 5);
    }
  };

  const sendAnswer = () => {
    var urlParams = new URLSearchParams();
    urlParams.append("accessToken", Cookies.get("access_token") || "");
    urlParams.append("body", answer);
    urlParams.append("question", String(questionID));

    axios
      .post(targetURL + "/answer", urlParams)
      .then((response) => {
        if (response.data.success) {
          setAnswerBody(answer);
          window.location.href = viewerURL + "/question/" + params.token;
        } else {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert(error.response.data.message);
      });
  };

  React.useEffect(() => {
    var urlParams = new URLSearchParams();
    urlParams.append("accessToken", Cookies.get("access_token") || "");

    axios
      .post(targetURL + "/question/" + params.token, urlParams)
      .then((response) => {
        if (response.data.success) {
          setQuestion(response.data.body);
          setQuestionID(response.data.question_id);
          setAnswerBody(response.data.answer_body);
          setCreatedAt(response.data.created_at);
          setIP(response.data.ip);
          setEmail(response.data.email);
          setUserAgent(response.data.useragent);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Box">
        {question.split("\n").map((value, i) => {
          return <div>{value}</div>;
        })}
        <div>{formatTime(createdAt)}</div>
        <div>{showID(email, ip)}</div>
        <div className="UserAgent">{userAgent}</div>
      </div>
      <hr />
      <div>
        {answerBody === ""
          ? "まだ返信していません"
          : answerBody.split("\n").map((value, i) => {
              return <div>{value}</div>;
            })}
      </div>
      <hr />
      <div>
        <textarea onChange={(e) => setAnswer(e.target.value)}>
          {answer}
        </textarea>
      </div>
      <div>
        <button
          onClick={() => {
            sendAnswer();
          }}
        >
          {answerBody === "" ? "返信" : "更新"}
        </button>
      </div>
    </>
  );
};
export default Question;
