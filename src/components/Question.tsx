import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

const targetURL: string = process.env.REACT_APP_API_BASE_URL || "";

const Question = () => {
  const [question, setQuestion] = React.useState("");
  const [questionID, setQuestionID] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [answerBody, setAnswerBody] = React.useState("");
  const params = useParams();

  const sendAnswer = () => {
    var urlParams = new URLSearchParams()
    urlParams.append('accessToken', Cookies.get("access_token") || "")
    urlParams.append('body', answer)
    urlParams.append('question', String(questionID))
   
    axios.post(targetURL + "/answer", urlParams)
    .then((response) => {
      if(response.data.success) {
        setAnswerBody(answer)
      } else {
        alert(response.data.message);
      }
    })
    .catch((error : any) => {
      alert(error.response.data.message);
    });
  }

  React.useEffect(() => {
    var urlParams = new URLSearchParams()
    urlParams.append('accessToken', Cookies.get("access_token") || "")

    axios.post(targetURL + "/question/" + params.token, urlParams)
    .then((response) => {
      if(response.data.success) {
        setQuestion(response.data.body)
        setQuestionID(response.data.question_id)
        setAnswerBody(response.data.answer_body)
      } else {
        alert(response.data.message);
      }
    })
    .catch((error : any) => {
      alert(error.response.data.message);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {question}
      <hr />
      <div>
        {answerBody}
      </div>
      <hr />
      <div>
        <textarea onChange={(e) => setAnswer(e.target.value)}>
        </textarea>
      </div>
      <div>
        <button onClick={() => {sendAnswer()}}>返信</button>
      </div>
    </>
  )
}
export default Question;
