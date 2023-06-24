import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    Cookies.remove('access_token')
    navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <></>
  )
}

export default Logout;