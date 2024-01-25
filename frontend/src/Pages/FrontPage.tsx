import React from "react";
import { GradientButton } from "../components/GradientButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";

interface Props {}

export const FrontPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const user = useSelector((state: RootState) => state.user)

  return (
    <div className="column">
      <div className="row">
        {
          user.id ? (
            <p>{t("welcome") + " " + user.username + "!"}</p>
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
    </div>
  );
};
