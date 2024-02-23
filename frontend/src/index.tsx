import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n.ts';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoadingPage } from './Pages/LoadingPage';
import { FrontPage } from "./Pages/FrontPage";
import { SignupPage } from "./Pages/SignupPage";
import { ErrorPage } from "./Pages/ErrorPage";
import { LoginPage } from "./Pages/LoginPage";
import { CreatePage } from "./Pages/CreatePage";
import { SetPage } from "./Pages/SetPage";
import { SetsPage } from "./Pages/SetsPage";



const container = document.getElementById('root')
const root = createRoot(container!)

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: FrontPage
      },
      {
        path: "login",
        Component: LoginPage
      },
      {
        path: "signup",
        Component: SignupPage
      },
      { 
        path: "/create", 
        Component: CreatePage
      },
      { 
        path: "/sets", 
        Component: SetsPage,
      },
      {
        path: "/sets/:id",
        Component: SetPage
      },
      {
        path: "*",
        Component: ErrorPage
      }
    ]
  }
])

root.render(
  <Suspense fallback={
    <LoadingPage/>
  }>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </Suspense>
);