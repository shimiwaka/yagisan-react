import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

type Questions = {
  body: string;
  token: string;
}

const MyPage = () => {
  const [questions, setQuestions] = React.useState<Questions[]>([]);

  React.useEffect(() => {
    getQuestions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuestions = () => {
    var urlParams = new URLSearchParams()
    urlParams.append('accessToken', Cookies.get("access_token") || "")
  
    axios.post(targetURL + "/box/show", urlParams)
    .then((response) => {
      if(response.data.success) {
        setQuestions(response.data.questions);
      } else {
        alert(response.data.message);
      }
    })
    .catch((error : any) => {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    });
  }

  return (
    <>
      <div>マイページ</div>
      <div className="Questions">
        {questions.length === 0 ? "対象となる選手がいません。" :
          questions.map(
            (value, i) => 
            {
              return (
                <div>
                  {value.body}
                </div>
              )
            }
          )
        }
      </div>
      <div>
        <Link to="/register">新規登録</Link>
      </div>
    </>
  );
};

export default MyPage;
