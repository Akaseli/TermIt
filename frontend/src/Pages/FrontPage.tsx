import React from "react";
import { GradientButton } from "../components/GradientButton";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { userLogin } from "../app/behaviours/userSlice";

import "./FrontPage.css"


interface Props {}

export const FrontPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)


  const logout = () => {
    axios.post("/api/logout").then((response) => {
      if(response.status == 200){
        dispatch(userLogin({id: undefined, username: undefined}))
      }
    })
  }

  return (
    <div className="column frontpage">
      <div className="row">
        {
          user.id ? (
            <div className="column">
              <p>{t("welcome") + " " + user.username + "!"}</p>
              <div className="row">
                <GradientButton onClick={logout}>
                  {t("logout")}
                </GradientButton>

                <Link to={"/create"}>
                  <GradientButton>
                    {t("create")}
                  </GradientButton>
                </Link>

                <Link to={"/sets"}>
                  <GradientButton>
                    {t("sets")}
                  </GradientButton>
                </Link>
              </div>
             

            </div>
          ):
          (
            <div>
              <Link to={"/login"}>
                <GradientButton>
                  {t("login")}
                </GradientButton>
              </Link>

              <Link to={"/signup"}>
                <GradientButton>
                  {t("signup")}
                </GradientButton>
              </Link>

            </div>
          )
        }
      </div>
    </div>
  );
};
