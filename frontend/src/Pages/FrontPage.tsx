import React from "react";
import { GradientButton } from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { userLogin } from "../app/behaviours/userSlice";
import { SetCard } from "../components/SetCard";

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
    <div className="column">
      <div className="row">
        {
          user.id ? (
            <div>
              <p>{t("welcome") + " " + user.username + "!"}</p>
              <GradientButton onClick={logout}>
                {t("logout")}
              </GradientButton>
            </div>
          ):
          (
            <div>
              <GradientButton onClick={() => navigate("/login")}>
                {t("login")}
              </GradientButton>
              
              <GradientButton onClick={() => navigate("/signup")}>
                {t("signup")}
              </GradientButton>
            </div>
          )
        }
      </div>
      
      <h2>Sets</h2>
      
      <div className="setlist">
        <SetCard set={{name: "Test", owner: "Test owner", terms: 215}} />
      </div>

    </div>
  );
};
