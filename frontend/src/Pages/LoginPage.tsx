import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GradientButton } from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const [loginPass, setLoginPass] = useState("");
  const [loginUser, setLoginUser] = useState("");

  const navigate = useNavigate();

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUser,
        password: loginPass,
      },
      withCredentials: true,
      url: "/api/login/",
    }).then((response) => {
      //Successfull
      if (response.data.status == "success") {
        navigate("/")
      } else {
        //Show error/etc
      }
    });
  };

  return (
    <div>
      <div className="column">
        <div className="row">
          <input placeholder="Username" type="text" onChange={(e) => setLoginUser(e.target.value)}/>
        </div>

        <div className="row">
          <input placeholder="Password" type="password" onChange={(e) => setLoginPass(e.target.value)}/>
        </div>

        <GradientButton onClick={login}>{t("login")}</GradientButton>
      </div>
    </div>
  );
};
