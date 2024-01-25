import React, { Suspense, useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FrontPage } from "./Pages/FrontPage";
import { SignupPage } from "./Pages/SignupPage";
import { useTranslation } from "react-i18next";
import { LoadingPage } from "./Pages/LoadingPage";
import { ErrorPage } from "./Pages/ErrorPage";
import { LoginPage } from "./Pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import axios from "axios";
import { response } from "express";
import { userLogin } from "./app/behaviours/userSlice";

function App() {
  const router = createBrowserRouter([
    { path: "/", Component: FrontPage },
    { path: "/signup", Component: SignupPage },
    { path: "/login", Component: LoginPage },
    { path: "*", Component: ErrorPage },
  ]);

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if(!user.id){
      axios.get("/api/user").then((response) => {
        console.log(response)
        if(response.status == 200){
          dispatch(userLogin(response.data))
        }
      }).catch((reason) => {
        //Not logged in
      })
    }
  }, [])

  return (
    <div>
      <div className="appbar">
        <a href="/" className="logo">
          <p>TermIt</p>
        </a>

        <div className="langMenu">
          <img
            className="langFlag"
            src={`/api/static/flags/${i18n.language}.svg`}
          />
          <select
            className="langSelector"
            defaultValue={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
          >
            <option value={"fi"}>suomi</option>
            <option value={"en"}>English</option>
          </select>
        </div>
      </div>

      <div className="content">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
