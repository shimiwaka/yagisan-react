import axios from "axios";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

type Questions = {
  body: string;
  token: string;
  CreatedAt: string;
  user_agent: string;
  ip: string;
  email: string;
};

const MyPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [username, setUsername] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(0);

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

  const getQuestions = (page: number) => {
    var urlParams = new URLSearchParams();
    urlParams.append("accessToken", Cookies.get("access_token") || "");
    urlParams.append("page", String(page));

    axios
      .post(targetURL + "/box/show", urlParams)
      .then((response) => {
        if (response.data.success) {
          setQuestions(response.data.questions);
          setUsername(response.data.username);
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
  };

  React.useEffect(() => {
    getQuestions(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertReturns = (rawStr: string) => {
    const splitStr = rawStr.split("\n");
    let value = "";

    for (let i = 0; i < splitStr.length; i++) {
      value += "<div>" + splitStr[i] + "</div>";
    }
    return value;
  };

  const prev = () => {
    if (page <= 0) {
      return;
    }
    const newPage = page - 1;
    setPage(page - 1);
    getQuestions(newPage);
  };

  const next = () => {
    if (questions.length !== 10) {
      return;
    }
    const newPage = page + 1;
    setPage(page + 1);
    getQuestions(newPage);
  };

  return (
    <>
      <div>
        {username} のマイページは<Link to={"/box/" + username}>こちら</Link><br />
        <Link to="/profile">設定変更</Link> /{" "}
        <Link to="/logout">ログアウト</Link>
      </div>
      <div className="Navigater">
        <button
          onClick={() => {
            prev();
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => {
            next();
          }}
        >
          &gt;
        </button>
      </div>
      <div className="Questions">
        {questions.length === 0
          ? "質問が何も届いていません。"
          : questions.map((value, i) => {
              return (
                <div className="Box">
                  <div>
                    {value.body.split("\n").map((value2, i2) => {
                      return <div>{value2}</div>;
                    })}
                  </div>
                  <div>{formatTime(value.CreatedAt)}</div>
                  <div>{showID(value.email, value.ip)}</div>
                  <div className="UserAgent">{value.user_agent}</div>
                  <div>
                    <Link to={"/question/" + value.token}>返信する</Link>
                  </div>
                </div>
              );
            })}
      </div>
      <div className="Navigater">
        <button
          onClick={() => {
            prev();
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => {
            next();
          }}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default MyPage;
