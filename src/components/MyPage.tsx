import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

type Questions = {
  body: string;
  token: string;
};

const MyPage = () => {
  const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [username, setUsername] = React.useState<string>("");

  React.useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuestions = () => {
    var urlParams = new URLSearchParams();
    urlParams.append("accessToken", Cookies.get("access_token") || "");

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
        alert(errorMessage);
      });
  };

  return (
    <>
      <div>
        {username} のマイページは<Link to={"/box/" + username}>こちら</Link> / <Link to="/logout">ログアウト</Link>
      </div>
      <div className="Questions">
        {questions.length === 0
          ? "質問が何も届いていません。"
          : questions.map((value, i) => {
              return (
                <div>
                  <hr />
                  {value.body}
                  <div>
                    <Link to={"/question/" + value.token}>返信する</Link>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default MyPage;
