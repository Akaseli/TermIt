import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GradientButton } from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {}

export const SignupPage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const [registerPass, setRegisterPass] = useState("");
  const [registerUser, setRegisterUser] = useState("");

  const navigate = useNavigate();

  const signup = () => {
    axios({
      method: "POST",
      data: {
        username: registerUser,
        password: registerPass,
      },
      withCredentials: true,
      url: "/api/signup/",
    }).then((response) => {
      //Successfull
      if (response.data.status == "success") {
        navigate("/login");
      } else {
        //Show error/etc
      }
    });
  };

  return (
    <div>
      <div className="column">
        <div className="row">
          <input placeholder="Username" type="text" onChange={(e) => setRegisterUser(e.target.value)}/>
        </div>

        <div className="row">
          <input placeholder="Password" type="password" onChange={(e) => setRegisterPass(e.target.value)}/>
        </div>

        <GradientButton onClick={signup}>{t("signup")}</GradientButton>
      </div>
    </div>
  );
};
